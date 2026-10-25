import { TicketCategory, TicketMessage, TicketStatus } from '@/types/ticket.types';

export interface TicketUpdateEvent {
  ticketId: string;
  status: TicketStatus;
  category: TicketCategory;
  updatedAt: string;
}

export interface TicketReplyEvent {
  ticketId: string;
  message: TicketMessage;
}

export interface ServerEvents {
  'ticket:updated': TicketUpdateEvent;
  'ticket:reply': TicketReplyEvent;
}

export type ServerEventName = keyof ServerEvents;
