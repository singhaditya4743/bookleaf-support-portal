import { AiProvider, TicketCategory, TicketPriority, TicketStatus } from '@prisma/client';
import { TicketAssigneeRef } from '@/types/admin-ticket.types';
import { InternalNoteView } from '@/types/note.types';
import { TicketMessageView } from '@/types/ticket.types';
import { AuthUser } from '@/types/user.types';

export enum SocketEvent {
  TicketCreated = 'ticket:created',
  TicketUpdated = 'ticket:updated',
  TicketReply = 'ticket:reply',
  TicketNote = 'ticket:note',
  TicketTriaged = 'ticket:triaged',
  TicketDraftReady = 'ticket:draft-ready',
}

export const ADMINS_ROOM = 'admins';
export const authorRoom = (authorId: string): string => `author:${authorId}`;

export interface SocketData {
  user: AuthUser;
}

export interface AuthorTicketUpdate {
  ticketId: string;
  status: TicketStatus;
  category: TicketCategory;
  updatedAt: Date;
}

export interface AdminTicketUpdate extends AuthorTicketUpdate {
  priority: TicketPriority;
  assignedTo: TicketAssigneeRef | null;
}

export interface TicketCreatedEvent {
  ticketId: string;
  subject: string;
  createdAt: Date;
}

export interface TicketTriagedEvent {
  ticketId: string;
  category: TicketCategory;
  priority: TicketPriority;
  classifiedBy: AiProvider;
}

export interface TicketReplyEvent {
  ticketId: string;
  message: TicketMessageView;
}

export interface TicketNoteEvent {
  ticketId: string;
  note: InternalNoteView;
}

export interface TicketDraftReadyEvent {
  ticketId: string;
  aiDraftAt: Date;
  provider: AiProvider;
}
