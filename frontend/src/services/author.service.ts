import { apiRequest } from '@/lib/api/client';
import { AuthorTicketDetail, CreateTicketInput } from '@/types/ticket.types';

export const AUTHOR_API = {
  books: '/author/books',
  tickets: '/author/tickets',
  ticket: (id: string) => `/author/tickets/${id}`,
};

export const createTicket = (input: CreateTicketInput): Promise<AuthorTicketDetail> =>
  apiRequest<AuthorTicketDetail>(AUTHOR_API.tickets, { method: 'POST', body: input });
