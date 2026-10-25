'use client';

import { useApiQuery } from '@/hooks/common/use-api-query';
import { useSocketEvent } from '@/hooks/common/use-socket-event';
import { AUTHOR_API } from '@/services/author.service';
import { AuthorTicketDetail, TicketStatus } from '@/types/ticket.types';

const CLOSED_STATUSES: TicketStatus[] = ['RESOLVED', 'CLOSED'];

export function useAuthorTicket(ticketId: string) {
  const { data, error, loading, reload, setData } = useApiQuery<AuthorTicketDetail>(
    AUTHOR_API.ticket(ticketId),
  );

  useSocketEvent('ticket:reply', ({ ticketId: id, message }) => {
    if (id !== ticketId) return;
    setData((ticket) =>
      ticket.messages.some((item) => item.id === message.id)
        ? ticket
        : { ...ticket, updatedAt: message.createdAt, messages: [...ticket.messages, message] },
    );
  });

  useSocketEvent('ticket:updated', ({ ticketId: id, status, category, updatedAt }) => {
    if (id !== ticketId) return;
    setData((ticket) => ({
      ...ticket,
      status,
      category,
      updatedAt,
      resolvedAt: CLOSED_STATUSES.includes(status) ? (ticket.resolvedAt ?? updatedAt) : null,
    }));
  });

  return { ticket: data, error, loading: loading && !data, reload };
}
