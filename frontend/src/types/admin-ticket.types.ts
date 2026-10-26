import { InternalNote } from '@/types/note.types';
import { TicketBookRef, TicketCategory, TicketMessage, TicketStatus } from '@/types/ticket.types';

export type TicketPriority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export type AiProvider = 'GEMINI' | 'GROQ' | 'KEYWORD_FALLBACK';

export type TicketSort = 'urgency' | 'newest' | 'oldest';

export interface TicketAuthorRef {
  id: string;
  name: string;
  email: string;
}

export interface TicketAssigneeRef {
  id: string;
  name: string;
}

export interface AdminTicketSummary {
  id: string;
  subject: string;
  status: TicketStatus;
  category: TicketCategory;
  priority: TicketPriority;
  author: TicketAuthorRef;
  book: TicketBookRef | null;
  assignedTo: TicketAssigneeRef | null;
  replyCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface AdminTicketDetail extends Omit<AdminTicketSummary, 'replyCount'> {
  description: string;
  attachmentName: string | null;
  classifiedBy: AiProvider | null;
  aiDraft: string | null;
  aiDraftAt: string | null;
  resolvedAt: string | null;
  messages: TicketMessage[];
  notes: InternalNote[];
}

export interface TicketFilters {
  status: TicketStatus | '';
  category: TicketCategory | '';
  priority: TicketPriority | '';
  from: string;
  to: string;
  search: string;
  sort: TicketSort;
  page: number;
}

export type TicketAction = 'update' | 'assign' | 'reply' | 'note' | 'draft';

export interface TicketActionError {
  action: TicketAction;
  message: string;
}

export interface TicketActions {
  pending: TicketAction | null;
  error: TicketActionError | null;
  update: (input: UpdateTicketInput) => Promise<boolean>;
  assignToMe: () => Promise<boolean>;
  reply: (body: string) => Promise<boolean>;
  addNote: (body: string) => Promise<boolean>;
  regenerateDraft: () => Promise<boolean>;
}

export interface AdminTicketContextValue {
  ticket: AdminTicketDetail;
  actions: TicketActions;
}

export interface UpdateTicketInput {
  status?: TicketStatus;
  category?: TicketCategory;
  priority?: TicketPriority;
  assignedToId?: string | null;
}
