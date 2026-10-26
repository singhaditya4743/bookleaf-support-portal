import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AiProvider } from '@prisma/client';
import { EnvironmentVariables } from '@/config/env.variables';
import { toProviderError } from '@/modules/ai/providers/provider-http.error';
import { GroqResponse, LlmProvider, LlmRequest, LlmResult } from '@/types/ai.types';

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

@Injectable()
export class GroqProvider implements LlmProvider {
  readonly name = AiProvider.GROQ;

  constructor(private readonly config: ConfigService<EnvironmentVariables, true>) {}

  isConfigured(): boolean {
    return Boolean(this.config.get('GROQ_API_KEY', { infer: true }));
  }

  async complete(request: LlmRequest): Promise<LlmResult> {
    const model = this.config.get('GROQ_MODEL', { infer: true });
    const response = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.config.get('GROQ_API_KEY', { infer: true }) ?? ''}`,
      },
      body: JSON.stringify({
        model,
        temperature: request.temperature,
        max_tokens: request.maxTokens,
        response_format: request.json ? { type: 'json_object' } : undefined,
        messages: [
          { role: 'system', content: request.system },
          { role: 'user', content: request.user },
        ],
      }),
      signal: AbortSignal.timeout(this.config.get('AI_TIMEOUT_MS', { infer: true })),
    });

    if (!response.ok) {
      throw await toProviderError('Groq', response);
    }

    const data = (await response.json()) as GroqResponse;
    const text = data.choices?.[0]?.message?.content;
    if (!text) {
      throw new Error('Groq returned an empty response');
    }

    return {
      text,
      model: data.model ?? model,
      inputTokens: data.usage?.prompt_tokens ?? 0,
      outputTokens: data.usage?.completion_tokens ?? 0,
    };
  }
}
