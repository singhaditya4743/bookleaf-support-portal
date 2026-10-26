import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AiProvider } from '@prisma/client';
import { EnvironmentVariables } from '@/config/env.variables';
import { toProviderError } from '@/modules/ai/providers/provider-http.error';
import { GeminiResponse, LlmProvider, LlmRequest, LlmResult } from '@/types/ai.types';

const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

@Injectable()
export class GeminiProvider implements LlmProvider {
  readonly name = AiProvider.GEMINI;

  constructor(private readonly config: ConfigService<EnvironmentVariables, true>) {}

  isConfigured(): boolean {
    return Boolean(this.config.get('GEMINI_API_KEY', { infer: true }));
  }

  async complete(request: LlmRequest): Promise<LlmResult> {
    const model = this.config.get('GEMINI_MODEL', { infer: true });
    const response = await fetch(`${GEMINI_URL}/${model}:generateContent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': this.config.get('GEMINI_API_KEY', { infer: true }) ?? '',
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: request.system }] },
        contents: [{ role: 'user', parts: [{ text: request.user }] }],
        generationConfig: {
          temperature: request.temperature,
          maxOutputTokens: request.maxTokens,
          responseMimeType: request.json ? 'application/json' : 'text/plain',
        },
      }),
      signal: AbortSignal.timeout(this.config.get('AI_TIMEOUT_MS', { infer: true })),
    });

    if (!response.ok) {
      throw await toProviderError('Gemini', response);
    }

    const data = (await response.json()) as GeminiResponse;
    const text = data.candidates?.[0]?.content?.parts?.map((part) => part.text ?? '').join('');
    if (!text) {
      throw new Error('Gemini returned an empty response');
    }

    return {
      text,
      model: data.modelVersion ?? model,
      inputTokens: data.usageMetadata?.promptTokenCount ?? 0,
      outputTokens: data.usageMetadata?.candidatesTokenCount ?? 0,
    };
  }
}
