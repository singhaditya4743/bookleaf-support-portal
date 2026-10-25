import { Prisma } from '@prisma/client';
import { AuthorTicketDetail, AuthorTicketSummary } from '@/types/ticket.types';

export const TICKET_SUMMARY_SELECT = {
  id: true,
  subject: true,
  status: true,
  category: true,
  createdAt: true,
  updatedAt: true,
  book: { select: { id: true, title: true } },
  _count: { select: { messages: true } },
} satisfies Prisma.TicketSelect;

export const TICKET_DETAIL_SELECT = {
  id: true,
  subject: true,
  description: true,
  attachmentName: true,
  status: true,
  category: true,
  resolvedAt: true,
  createdAt: true,
  updatedAt: true,
  book: { select: { id: true, title: true } },
  messages: {
    orderBy: { createdAt: 'asc' },
    select: {
      id: true,
      body: true,
      createdAt: true,
      sender: { select: { name: true, role: true } },
    },
  },
} satisfies Prisma.TicketSelect;

type TicketSummaryRow = Prisma.TicketGetPayload<{ select: typeof TICKET_SUMMARY_SELECT }>;
type TicketDetailRow = Prisma.TicketGetPayload<{ select: typeof TICKET_DETAIL_SELECT }>;

export function toTicketSummary({ _count, ...ticket }: TicketSummaryRow): AuthorTicketSummary {
  return { ...ticket, replyCount: _count.messages };
}

export function toTicketDetail({ messages, ...ticket }: TicketDetailRow): AuthorTicketDetail {
  return {
    ...ticket,
    messages: messages.map(({ sender, ...message }) => ({
      ...message,
      senderName: sender.name,
      senderRole: sender.role,
    })),
  };
}
