import { apiRequest } from '@/lib/api/client';
import { toQueryString } from '@/lib/query-string';
import { AdminTicketDetail, TicketFilters, UpdateTicketInput } from '@/types/admin-ticket.types';
import { AiDraftResult } from '@/types/ai-draft.types';
import { InternalNote } from '@/types/note.types';
import { TicketMessage } from '@/types/ticket.types';

export const ADMIN_PAGE_SIZE = 10;

const ticketPath = (id: string) => `/admin/tickets/${id}`;

export const ADMIN_API = {
  tickets: (filters: TicketFilters) =>
    `/admin/tickets${toQueryString({ ...filters, limit: ADMIN_PAGE_SIZE })}`,
  ticket: ticketPath,
};

export const updateTicket = (id: string, input: UpdateTicketInput) =>
  apiRequest<AdminTicketDetail>(ticketPath(id), { method: 'PATCH', body: input });

export const assignToMe = (id: string) =>
  apiRequest<AdminTicketDetail>(`${ticketPath(id)}/assign-to-me`, { method: 'POST' });

export const sendReply = (id: string, body: string) =>
  apiRequest<TicketMessage>(`${ticketPath(id)}/replies`, { method: 'POST', body: { body } });

export const addNote = (id: string, body: string) =>
  apiRequest<InternalNote>(`${ticketPath(id)}/notes`, { method: 'POST', body: { body } });

export const generateDraft = (id: string) =>
  apiRequest<AiDraftResult>(`${ticketPath(id)}/ai-draft`, { method: 'POST' });
