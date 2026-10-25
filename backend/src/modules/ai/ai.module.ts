import { Global, Module } from '@nestjs/common';
import { AiService } from '@/modules/ai/ai.service';
import { DraftContextService } from '@/modules/ai/draft-context.service';
import { LlmRouterService } from '@/modules/ai/llm-router.service';
import { GeminiProvider } from '@/modules/ai/providers/gemini.provider';
import { GroqProvider } from '@/modules/ai/providers/groq.provider';
import { TicketTriageService } from '@/modules/ai/ticket-triage.service';

@Global()
@Module({
  providers: [
    AiService,
    TicketTriageService,
    LlmRouterService,
    DraftContextService,
    GeminiProvider,
    GroqProvider,
  ],
  exports: [AiService, TicketTriageService],
})
export class AiModule {}
