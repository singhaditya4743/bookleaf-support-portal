'use client';

import { useApiQuery } from '@/hooks/common/use-api-query';
import { useSocketEvent } from '@/hooks/common/use-socket-event';
import { applyTicketUpdate } from '@/lib/ticket-updates';
import { ADMIN_API } from '@/services/admin.service';
import { AdminTicketSummary, TicketFilters } from '@/types/admin-ticket.types';
import { Paginated } from '@/types/api.types';

type TicketPatch = (ticket: AdminTicketSummary) => AdminTicketSummary;

export function useAdminTickets(filters: TicketFilters) {
  const { data, error, loading, reload, setData } = useApiQuery<Paginated<AdminTicketSummary>>(
    ADMIN_API.tickets(filters),
  );

  const patch = (ticketId: string, update: TicketPatch) =>
    setData((page) => ({
      ...page,
      items: page.items.map((ticket) => (ticket.id === ticketId ? update(ticket) : ticket)),
    }));

  useSocketEvent('ticket:created', reload);

  useSocketEvent('ticket:triaged', ({ ticketId, category, priority }) =>
    patch(ticketId, (ticket) => ({ ...ticket, category, priority })),
  );

  useSocketEvent('ticket:updated', (event) =>
    patch(event.ticketId, (ticket) => applyTicketUpdate(ticket, event)),
  );

  useSocketEvent('ticket:reply', ({ ticketId }) =>
    patch(ticketId, (ticket) => ({ ...ticket, replyCount: ticket.replyCount + 1 })),
  );

  return { page: data, error, loading: loading && !data, reload };
}
