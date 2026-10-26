'use client';

import { Inbox } from 'lucide-react';
import { useCallback } from 'react';
import { QueueFilters } from '@/components/admin/QueueFilters';
import { QueueRow } from '@/components/admin/QueueRow';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { Pagination } from '@/components/ui/Pagination';
import { useAdminTickets } from '@/hooks/admin/use-admin-tickets';
import { useTicketFilters } from '@/hooks/admin/use-ticket-filters';
import { ADMIN_PAGE_SIZE } from '@/services/admin.service';

export function AdminQueueView() {
  const { filters, setFilters, resetFilters, isFiltered } = useTicketFilters();
  const { page, error, loading, reload } = useAdminTickets(filters);
  const changePage = useCallback((value: number) => setFilters({ page: value }), [setFilters]);
  const total = page?.total ?? 0;

  return (
    <>
      <PageHeader
        title="Ticket Queue"
        description={
          page
            ? `${total} ${total === 1 ? 'ticket' : 'tickets'} · most urgent and oldest unresolved first`
            : 'Every author query in one place.'
        }
      />
      <Card className="overflow-hidden">
        <QueueFilters
          filters={filters}
          isFiltered={isFiltered}
          onChange={setFilters}
          onReset={resetFilters}
        />
        {loading && <div className="h-64 animate-pulse bg-slate-50" aria-busy="true" />}
        {error && !page && (
          <div className="p-4">
            <ErrorState message={error.message} onRetry={reload} />
          </div>
        )}
        {page && page.items.length === 0 && (
          <EmptyState
            icon={Inbox}
            title={isFiltered ? 'No tickets match these filters' : 'No tickets yet'}
            description={
              isFiltered
                ? 'Try clearing a filter or searching for something else.'
                : 'New author queries will appear here as soon as they are raised.'
            }
          />
        )}
        {page && page.items.length > 0 && (
          <ul className="divide-y divide-slate-100">
            {page.items.map((ticket) => (
              <QueueRow key={ticket.id} ticket={ticket} />
            ))}
          </ul>
        )}
        <Pagination
          page={filters.page}
          totalPages={Math.ceil(total / ADMIN_PAGE_SIZE)}
          totalItems={total}
          pageSize={ADMIN_PAGE_SIZE}
          onChange={changePage}
        />
      </Card>
    </>
  );
}
