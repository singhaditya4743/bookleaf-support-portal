import { AiProvider } from '@/types/admin-ticket.types';

export interface AiDraftResult {
  aiDraft: string;
  aiDraftAt: string;
  provider: AiProvider;
}
