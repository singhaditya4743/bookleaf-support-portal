import { Role, TicketCategory, TicketStatus } from '@prisma/client';

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
  createdAt: Date;
  updatedAt: Date;
}

export interface TicketMessageView {
  id: string;
  body: string;
  senderName: string;
  senderRole: Role;
  createdAt: Date;
}

export interface AuthorTicketDetail extends Omit<AuthorTicketSummary, 'replyCount'> {
  description: string;
  attachmentName: string | null;
  resolvedAt: Date | null;
  messages: TicketMessageView[];
}
