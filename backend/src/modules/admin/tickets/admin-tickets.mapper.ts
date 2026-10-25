import { Prisma } from '@prisma/client';
import { TICKET_MESSAGES_SELECT, toMessageView } from '@/common/mappers/ticket-message.mapper';
import { AdminTicketDetail, AdminTicketSummary } from '@/types/admin-ticket.types';

const TICKET_BASE_SELECT = {
  id: true,
  subject: true,
  status: true,
  category: true,
  priority: true,
  createdAt: true,
  updatedAt: true,
  author: { select: { id: true, name: true, email: true } },
  book: { select: { id: true, title: true } },
  assignedTo: { select: { id: true, name: true } },
} satisfies Prisma.TicketSelect;

export const ADMIN_TICKET_SUMMARY_SELECT = {
  ...TICKET_BASE_SELECT,
  _count: { select: { messages: true } },
} satisfies Prisma.TicketSelect;

export const ADMIN_TICKET_DETAIL_SELECT = {
  ...TICKET_BASE_SELECT,
  description: true,
  attachmentName: true,
  classifiedBy: true,
  aiDraft: true,
  aiDraftAt: true,
  resolvedAt: true,
  messages: TICKET_MESSAGES_SELECT,
  notes: {
    orderBy: { createdAt: 'asc' },
    select: { id: true, body: true, createdAt: true, admin: { select: { name: true } } },
  },
} satisfies Prisma.TicketSelect;

type SummaryRow = Prisma.TicketGetPayload<{ select: typeof ADMIN_TICKET_SUMMARY_SELECT }>;
type DetailRow = Prisma.TicketGetPayload<{ select: typeof ADMIN_TICKET_DETAIL_SELECT }>;

export function toAdminTicketSummary({ _count, ...ticket }: SummaryRow): AdminTicketSummary {
  return { ...ticket, replyCount: _count.messages };
}

export function toAdminTicketDetail({ messages, notes, ...ticket }: DetailRow): AdminTicketDetail {
  return {
    ...ticket,
    messages: messages.map(toMessageView),
    notes: notes.map(({ admin, ...note }) => ({ ...note, adminName: admin.name })),
  };
}
