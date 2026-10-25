'use client';

import { useCallback, useMemo, useState } from 'react';
import { usePagination } from '@/hooks/common/use-pagination';
import { CATEGORY_LABELS } from '@/lib/labels';
import { AuthorTicketSummary, TicketStatusFilter } from '@/types/ticket.types';

const matches = (ticket: AuthorTicketSummary, term: string) =>
  [ticket.subject, ticket.book?.title ?? 'General', CATEGORY_LABELS[ticket.category]].some(
    (value) => value.toLowerCase().includes(term),
  );

export function useTicketList(tickets: AuthorTicketSummary[], pageSize: number) {
  const [filter, setFilter] = useState<TicketStatusFilter>('ALL');
  const [query, setQuery] = useState('');

  const searched = useMemo(() => {
    const term = query.trim().toLowerCase();
    return term ? tickets.filter((ticket) => matches(ticket, term)) : tickets;
  }, [tickets, query]);

  const visible = useMemo(
    () => (filter === 'ALL' ? searched : searched.filter((ticket) => ticket.status === filter)),
    [searched, filter],
  );

  const pagination = usePagination(visible, pageSize);
  const { setPage } = pagination;

  const changeFilter = useCallback(
    (value: TicketStatusFilter) => {
      setFilter(value);
      setPage(1);
    },
    [setPage],
  );

  const changeQuery = useCallback(
    (value: string) => {
      setQuery(value);
      setPage(1);
    },
    [setPage],
  );

  return { filter, query, searched, visible, ...pagination, changeFilter, changeQuery };
}
