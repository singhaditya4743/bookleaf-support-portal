import { Injectable, Logger } from '@nestjs/common';
import { AiProvider } from '@prisma/client';
import { GeminiProvider } from '@/modules/ai/providers/gemini.provider';
import { GroqProvider } from '@/modules/ai/providers/groq.provider';
import { ProviderHttpError } from '@/modules/ai/providers/provider-http.error';
import { PrismaService } from '@/prisma/prisma.service';
import { LlmProvider, LlmRequest, LlmResponse } from '@/types/ai.types';

const DEFAULT_COOLDOWN_MS = 60000;

@Injectable()
export class LlmRouterService {
  private readonly logger = new Logger(LlmRouterService.name);
  private readonly providers: LlmProvider[];
  private readonly cooldownUntil = new Map<AiProvider, number>();

  constructor(
    private readonly prisma: PrismaService,
    groq: GroqProvider,
    gemini: GeminiProvider,
  ) {
    this.providers = [groq, gemini];
  }

  async complete(request: LlmRequest): Promise<LlmResponse | null> {
    const available = this.providers.filter(
      (p) => p.isConfigured() && (this.cooldownUntil.get(p.name) ?? 0) <= Date.now(),
    );
    for (const provider of available) {
      const startedAt = Date.now();
      try {
        const result = await provider.complete(request);
        await this.log(provider, request, Date.now() - startedAt, { ...result, success: true });
        return { ...result, provider: provider.name };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        this.logger.warn(`${provider.name} ${request.operation} failed: ${message}`);
        this.startCooldown(provider.name, error);
        await this.log(provider, request, Date.now() - startedAt, {
          success: false,
          error: message,
        });
      }
    }
    return null;
  }

  private startCooldown(name: AiProvider, error: unknown): void {
    if (!(error instanceof ProviderHttpError)) return;
    if (error.status !== 429 && error.status < 500) return;
    const waitMs = error.retryAfterMs ?? DEFAULT_COOLDOWN_MS;
    this.cooldownUntil.set(name, Date.now() + waitMs);
    this.logger.warn(`${name} paused for ${Math.round(waitMs / 1000)}s after HTTP ${error.status}`);
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
