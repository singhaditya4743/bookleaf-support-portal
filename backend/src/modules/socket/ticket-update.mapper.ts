import { Prisma } from '@prisma/client';
import { AdminTicketUpdate } from '@/types/socket.types';

export const TICKET_UPDATE_SELECT = {
  id: true,
  authorId: true,
  status: true,
  category: true,
  priority: true,
  updatedAt: true,
  assignedTo: { select: { id: true, name: true } },
} satisfies Prisma.TicketSelect;

type TicketUpdateRow = Prisma.TicketGetPayload<{ select: typeof TICKET_UPDATE_SELECT }>;

export function toTicketUpdate(ticket: TicketUpdateRow): AdminTicketUpdate {
  return {
    ticketId: ticket.id,
    status: ticket.status,
    category: ticket.category,
    priority: ticket.priority,
    assignedTo: ticket.assignedTo,
    updatedAt: ticket.updatedAt,
  };
}
