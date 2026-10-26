'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { CATEGORY_LABELS, PRIORITY_LABELS, SORT_LABELS, STATUS_LABELS } from '@/lib/labels';
import { toQueryString } from '@/lib/query-string';
import { TicketFilters } from '@/types/admin-ticket.types';

const oneOf = <T extends string>(value: string | null, labels: Record<T, string>): T | '' =>
  value !== null && value in labels ? (value as T) : '';

export function useTicketFilters() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filters = useMemo<TicketFilters>(
    () => ({
      status: oneOf(params.get('status'), STATUS_LABELS),
      category: oneOf(params.get('category'), CATEGORY_LABELS),
      priority: oneOf(params.get('priority'), PRIORITY_LABELS),
      from: params.get('from') ?? '',
      to: params.get('to') ?? '',
      search: params.get('search') ?? '',
      sort: oneOf(params.get('sort'), SORT_LABELS) || 'urgency',
      page: Math.max(1, Number(params.get('page')) || 1),
    }),
    [params],
  );

  const setFilters = useCallback(
    (patch: Partial<TicketFilters>) => {
      const next = { ...filters, page: 1, ...patch };
      const query = toQueryString({
        ...next,
        sort: next.sort === 'urgency' ? '' : next.sort,
        page: next.page === 1 ? '' : next.page,
      });
      router.replace(`${pathname}${query}`, { scroll: false });
    },
    [filters, pathname, router],
  );

  const resetFilters = useCallback(() => router.replace(pathname), [pathname, router]);

  const { status, category, priority, from, to, search } = filters;
  const isFiltered = Boolean(status || category || priority || from || to || search);

  return { filters, setFilters, resetFilters, isFiltered };
}
