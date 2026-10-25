import { Prisma } from '@prisma/client';
import { TicketMessageView } from '@/types/ticket.types';

export const TICKET_MESSAGES_SELECT = {
  orderBy: { createdAt: 'asc' },
  select: {
    id: true,
    body: true,
    createdAt: true,
    sender: { select: { name: true, role: true } },
  },
} satisfies Prisma.Ticket$messagesArgs;

export const TICKET_MESSAGE_SELECT = TICKET_MESSAGES_SELECT.select;

type TicketMessageRow = Prisma.TicketMessageGetPayload<{ select: typeof TICKET_MESSAGE_SELECT }>;

export function toMessageView({ sender, ...message }: TicketMessageRow): TicketMessageView {
  return { ...message, senderName: sender.name, senderRole: sender.role };
}
