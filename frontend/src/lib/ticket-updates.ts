import { AdminTicketDetail, AdminTicketSummary } from '@/types/admin-ticket.types';
import { InternalNote } from '@/types/note.types';
import { TicketUpdateEvent } from '@/types/socket.types';
import { TicketMessage } from '@/types/ticket.types';

export function applyTicketUpdate<T extends AdminTicketSummary | AdminTicketDetail>(
  ticket: T,
  event: TicketUpdateEvent,
): T {
  return {
    ...ticket,
    status: event.status,
    category: event.category,
    updatedAt: event.updatedAt,
    priority: event.priority ?? ticket.priority,
    assignedTo: event.assignedTo === undefined ? ticket.assignedTo : event.assignedTo,
  };
}

export const appendMessage = (ticket: AdminTicketDetail, message: TicketMessage) =>
  ticket.messages.some((item) => item.id === message.id)
    ? ticket
    : { ...ticket, messages: [...ticket.messages, message] };

export const appendNote = (ticket: AdminTicketDetail, note: InternalNote) =>
  ticket.notes.some((item) => item.id === note.id)
    ? ticket
    : { ...ticket, notes: [...ticket.notes, note] };
