import { Injectable, Logger } from '@nestjs/common';
import { GeminiProvider } from '@/modules/ai/providers/gemini.provider';
import { GroqProvider } from '@/modules/ai/providers/groq.provider';
import { PrismaService } from '@/prisma/prisma.service';
import { LlmProvider, LlmRequest, LlmResponse } from '@/types/ai.types';

@Injectable()
export class LlmRouterService {
  private readonly logger = new Logger(LlmRouterService.name);
  private readonly providers: LlmProvider[];

  constructor(
    private readonly prisma: PrismaService,
    groq: GroqProvider,
    gemini: GeminiProvider,
  ) {
    this.providers = [groq, gemini];
  }

  async complete(request: LlmRequest): Promise<LlmResponse | null> {
    for (const provider of this.providers.filter((p) => p.isConfigured())) {
      const startedAt = Date.now();
      try {
        const result = await provider.complete(request);
        await this.log(provider, request, Date.now() - startedAt, { ...result, success: true });
        return { ...result, provider: provider.name };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        this.logger.warn(`${provider.name} ${request.operation} failed: ${message}`);
        await this.log(provider, request, Date.now() - startedAt, {
          success: false,
          error: message,
        });
      }
    }
    return null;
  }

  private async log(
    provider: LlmProvider,
    request: LlmRequest,
    latencyMs: number,
    outcome: {
      success: boolean;
      model?: string;
      inputTokens?: number;
      outputTokens?: number;
      error?: string;
    },
  ): Promise<void> {
    await this.prisma.aiLog
      .create({
        data: {
          ticketId: request.ticketId,
          provider: provider.name,
          operation: request.operation,
          model: outcome.model,
          inputTokens: outcome.inputTokens ?? 0,
          outputTokens: outcome.outputTokens ?? 0,
          latencyMs,
          success: outcome.success,
          error: outcome.error?.slice(0, 500),
        },
      })
      .catch((error: unknown) => this.logger.error('Could not save AI log', error));
  }
}
