import { Role } from '@/types/user.types';

export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';

export type TicketCategory =
  | 'ROYALTY_PAYMENTS'
  | 'ISBN_METADATA'
  | 'PRINTING_QUALITY'
  | 'DISTRIBUTION_AVAILABILITY'
  | 'BOOK_STATUS_PRODUCTION'
  | 'GENERAL_INQUIRY';

export type TicketStatusFilter = TicketStatus | 'ALL';

export interface TicketBookRef {
  id: string;
  title: string;
}

export interface AuthorTicketSummary {
  id: string;
  subject: string;
  status: TicketStatus;
  category: TicketCategory;
  book: TicketBookRef | null;
  replyCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface TicketMessage {
  id: string;
  body: string;
  senderName: string;
  senderRole: Role;
  createdAt: string;
}

export interface AuthorTicketDetail extends Omit<AuthorTicketSummary, 'replyCount'> {
  description: string;
  attachmentName: string | null;
  resolvedAt: string | null;
  messages: TicketMessage[];
}

export interface CreateTicketInput {
  bookId?: string;
  subject: string;
  description: string;
  attachmentName?: string;
}
