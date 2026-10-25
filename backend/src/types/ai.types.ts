import { AiOperation, AiProvider, TicketCategory, TicketPriority } from '@prisma/client';

export interface LlmRequest {
  operation: AiOperation;
  system: string;
  user: string;
  json: boolean;
  maxTokens: number;
  temperature: number;
  ticketId?: string;
}

export interface LlmResult {
  text: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
}

export interface LlmProvider {
  readonly name: AiProvider;
  isConfigured(): boolean;
  complete(request: LlmRequest): Promise<LlmResult>;
}

export interface LlmResponse extends LlmResult {
  provider: AiProvider;
}

export interface Classification {
  category: TicketCategory;
  priority: TicketPriority;
  provider: AiProvider;
}

export interface TicketClassificationInput {
  subject: string;
  description: string;
  bookStatus: string | null;
}

export interface AiDraftResult {
  aiDraft: string;
  aiDraftAt: Date;
  provider: AiProvider;
}

export interface GeminiResponse {
  candidates?: { content?: { parts?: { text?: string }[] } }[];
  usageMetadata?: { promptTokenCount?: number; candidatesTokenCount?: number };
  modelVersion?: string;
}

export interface GroqResponse {
  choices?: { message?: { content?: string } }[];
  usage?: { prompt_tokens?: number; completion_tokens?: number };
  model?: string;
}
