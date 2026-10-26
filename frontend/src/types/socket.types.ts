import { AiProvider, TicketAssigneeRef, TicketPriority } from '@/types/admin-ticket.types';
import { InternalNote } from '@/types/note.types';
import { TicketCategory, TicketMessage, TicketStatus } from '@/types/ticket.types';

export interface TicketUpdateEvent {
  ticketId: string;
  status: TicketStatus;
  category: TicketCategory;
  updatedAt: string;
  priority?: TicketPriority;
  assignedTo?: TicketAssigneeRef | null;
}

export interface TicketReplyEvent {
  ticketId: string;
  message: TicketMessage;
}

export interface TicketCreatedEvent {
  ticketId: string;
  subject: string;
  createdAt: string;
}

export interface TicketTriagedEvent {
  ticketId: string;
  category: TicketCategory;
  priority: TicketPriority;
  classifiedBy: AiProvider;
}

export interface TicketNoteEvent {
  ticketId: string;
  note: InternalNote;
}

export interface TicketDraftReadyEvent {
  ticketId: string;
  aiDraftAt: string;
  provider: AiProvider;
}

export interface ServerEvents {
  'ticket:updated': TicketUpdateEvent;
  'ticket:reply': TicketReplyEvent;
  'ticket:created': TicketCreatedEvent;
  'ticket:triaged': TicketTriagedEvent;
  'ticket:note': TicketNoteEvent;
  'ticket:draft-ready': TicketDraftReadyEvent;
}

export type ServerEventName = keyof ServerEvents;
