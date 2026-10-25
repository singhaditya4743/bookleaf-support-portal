import { MOCK_TICKETS } from '@/mocks/tickets.mock';
import { AuthorTicketDetail, AuthorTicketSummary } from '@/types/ticket.types';

const toSummary = ({ messages, ...ticket }: AuthorTicketDetail): AuthorTicketSummary => ({
  id: ticket.id,
  subject: ticket.subject,
  status: ticket.status,
  category: ticket.category,
  book: ticket.book,
  createdAt: ticket.createdAt,
  updatedAt: ticket.updatedAt,
  replyCount: messages.length,
});

export function useAuthorTickets(bookId?: string): AuthorTicketSummary[] {
  return MOCK_TICKETS.filter((ticket) => !bookId || ticket.book?.id === bookId)
    .map(toSummary)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function useAuthorTicket(ticketId: string): AuthorTicketDetail | null {
  return MOCK_TICKETS.find((ticket) => ticket.id === ticketId) ?? null;
}
