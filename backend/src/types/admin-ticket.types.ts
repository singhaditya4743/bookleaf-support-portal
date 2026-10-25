import { AiProvider, TicketCategory, TicketPriority, TicketStatus } from '@prisma/client';
import { InternalNoteView } from '@/types/note.types';
import { TicketBookRef, TicketMessageView } from '@/types/ticket.types';

export enum TicketSort {
  Urgency = 'urgency',
  Newest = 'newest',
  Oldest = 'oldest',
}

export interface TicketRef {
  status: TicketStatus;
  authorId: string;
}

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
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminTicketDetail extends Omit<AdminTicketSummary, 'replyCount'> {
  description: string;
  attachmentName: string | null;
  classifiedBy: AiProvider | null;
  aiDraft: string | null;
  aiDraftAt: Date | null;
  resolvedAt: Date | null;
  messages: TicketMessageView[];
  notes: InternalNoteView[];
}
