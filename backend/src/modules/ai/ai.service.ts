import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { AiOperation, TicketCategory, TicketPriority } from '@prisma/client';
import { DraftContextService } from '@/modules/ai/draft-context.service';
import { classifyByKeywords } from '@/modules/ai/fallback/keyword-classifier';
import { LlmRouterService } from '@/modules/ai/llm-router.service';
import {
  buildClassifyUserPrompt,
  CLASSIFY_SYSTEM_PROMPT,
} from '@/modules/ai/prompts/classify.prompt';
import { buildDraftSystemPrompt, buildDraftUserPrompt } from '@/modules/ai/prompts/draft.prompt';
import { PrismaService } from '@/prisma/prisma.service';
import { AiDraftResult, Classification, TicketClassificationInput } from '@/types/ai.types';

const isEnumValue = <T extends string>(values: Record<string, T>, value: unknown): value is T =>
  Object.values(values).includes(value as T);

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly router: LlmRouterService,
    private readonly draftContext: DraftContextService,
  ) {}

  async classify(input: TicketClassificationInput, ticketId?: string): Promise<Classification> {
    const response = await this.router.complete({
      operation: AiOperation.CLASSIFY,
      system: CLASSIFY_SYSTEM_PROMPT,
      user: buildClassifyUserPrompt(input),
      json: true,
      maxTokens: 60,
      temperature: 0,
      ticketId,
    });

    const parsed = response ? this.parseClassification(response.text) : null;
    if (response && parsed) {
      return { ...parsed, provider: response.provider };
    }
    return classifyByKeywords(input);
  }

  async generateDraft(ticketId: string): Promise<AiDraftResult> {
    const { category, context } = await this.draftContext.build(ticketId);
    const response = await this.router.complete({
      operation: AiOperation.DRAFT,
      system: buildDraftSystemPrompt(category),
      user: buildDraftUserPrompt(context),
      json: false,
      maxTokens: 500,
      temperature: 0.2,
      ticketId,
    });

    if (!response) {
      throw new ServiceUnavailableException(
        'AI draft is unavailable right now. Please write the reply manually.',
      );
    }

    const aiDraftAt = new Date();
    const aiDraft = response.text.trim();
    await this.prisma.ticket.update({ where: { id: ticketId }, data: { aiDraft, aiDraftAt } });
    return { aiDraft, aiDraftAt, provider: response.provider };
  }

  private parseClassification(text: string): Omit<Classification, 'provider'> | null {
    try {
      const json = JSON.parse(text.replace(/```(json)?/g, '').trim()) as Record<string, unknown>;
      if (
        isEnumValue(TicketCategory, json.category) &&
        isEnumValue(TicketPriority, json.priority)
      ) {
        return { category: json.category, priority: json.priority };
      }
    } catch {
      this.logger.warn(`Could not parse classification: ${text.slice(0, 120)}`);
    }
    return null;
  }
}
