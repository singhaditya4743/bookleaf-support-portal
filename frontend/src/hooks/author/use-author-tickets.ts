'use client';

import { useMemo } from 'react';
import { useApiQuery } from '@/hooks/common/use-api-query';
import { useSocketEvent } from '@/hooks/common/use-socket-event';
import { AUTHOR_API } from '@/services/author.service';
import { AuthorTicketSummary } from '@/types/ticket.types';

const NO_TICKETS: AuthorTicketSummary[] = [];

const byLatestUpdate = (a: AuthorTicketSummary, b: AuthorTicketSummary) =>
  b.updatedAt.localeCompare(a.updatedAt);

export function useAuthorTickets(bookId?: string) {
  const { data, error, loading, reload, setData } = useApiQuery<AuthorTicketSummary[]>(
    AUTHOR_API.tickets,
  );

  const patchTicket = (
    ticketId: string,
    patch: (ticket: AuthorTicketSummary) => AuthorTicketSummary,
  ) => {
    if (!data?.some((ticket) => ticket.id === ticketId)) return reload();
    setData((tickets) =>
      tickets.map((ticket) => (ticket.id === ticketId ? patch(ticket) : ticket)),
    );
  };

  useSocketEvent('ticket:updated', ({ ticketId, status, category, updatedAt }) =>
    patchTicket(ticketId, (ticket) => ({ ...ticket, status, category, updatedAt })),
  );

  useSocketEvent('ticket:reply', ({ ticketId, message }) =>
    patchTicket(ticketId, (ticket) => ({
      ...ticket,
      replyCount: ticket.replyCount + 1,
      updatedAt: message.createdAt,
    })),
  );

  const tickets = useMemo(
    () =>
      (data ?? NO_TICKETS)
        .filter((ticket) => !bookId || ticket.book?.id === bookId)
        .sort(byLatestUpdate),
    [data, bookId],
  );

  return { tickets, error, loading: loading && !data, reload };
}
