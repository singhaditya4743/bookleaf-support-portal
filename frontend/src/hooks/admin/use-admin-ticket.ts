'use client';

import { useApiQuery } from '@/hooks/common/use-api-query';
import { useSocketEvent } from '@/hooks/common/use-socket-event';
import { appendMessage, appendNote, applyTicketUpdate } from '@/lib/ticket-updates';
import { ADMIN_API } from '@/services/admin.service';
import { AdminTicketDetail } from '@/types/admin-ticket.types';

export function useAdminTicket(ticketId: string) {
  const query = useApiQuery<AdminTicketDetail>(ADMIN_API.ticket(ticketId));
  const { setData, reload } = query;

  useSocketEvent('ticket:reply', ({ ticketId: id, message }) => {
    if (id !== ticketId) return;
    setData((ticket) => {
      const next = appendMessage(ticket, message);
      return message.senderRole === 'AUTHOR' ? { ...next, aiDraft: null, aiDraftAt: null } : next;
    });
  });

  useSocketEvent('ticket:note', ({ ticketId: id, note }) => {
    if (id === ticketId) setData((ticket) => appendNote(ticket, note));
  });

  useSocketEvent('ticket:updated', (event) => {
    if (event.ticketId === ticketId) setData((ticket) => applyTicketUpdate(ticket, event));
  });

  useSocketEvent('ticket:triaged', ({ ticketId: id, category, priority, classifiedBy }) => {
    if (id === ticketId) setData((ticket) => ({ ...ticket, category, priority, classifiedBy }));
  });

  useSocketEvent('ticket:draft-ready', ({ ticketId: id }) => {
    if (id === ticketId) reload();
  });

  return { ...query, loading: query.loading && !query.data };
}
