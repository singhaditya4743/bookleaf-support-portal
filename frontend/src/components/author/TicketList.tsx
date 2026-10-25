'use client';

import { Ticket } from 'lucide-react';
import { ReactNode } from 'react';
import { StatusTabs } from '@/components/author/StatusTabs';
import { TicketRow } from '@/components/author/TicketRow';
import { EmptyState } from '@/components/ui/EmptyState';
import { Pagination } from '@/components/ui/Pagination';
import { SearchInput } from '@/components/ui/SearchInput';
import { useTicketList } from '@/hooks/author/use-ticket-list';
import { AuthorTicketSummary } from '@/types/ticket.types';

const PAGE_SIZE = 5;

interface TicketListProps {
  tickets: AuthorTicketSummary[];
  emptyAction: ReactNode;
}

export function TicketList({ tickets, emptyAction }: TicketListProps) {
  const list = useTicketList(tickets, PAGE_SIZE);

  if (!tickets.length) {
    return (
      <EmptyState
        icon={Ticket}
        title="No queries yet"
        description="When you raise a query, you can follow its progress and replies here."
        action={emptyAction}
      />
    );
  }

  return (
    <>
      <div className="border-b border-slate-200 px-4 py-3">
        <SearchInput
          value={list.query}
          placeholder="Search by subject, book or category"
          onChange={list.changeQuery}
        />
      </div>
      <StatusTabs tickets={list.searched} value={list.filter} onChange={list.changeFilter} />
      {list.pageItems.length ? (
        <ul className="divide-y divide-slate-100">
          {list.pageItems.map((ticket) => (
            <TicketRow key={ticket.id} ticket={ticket} />
          ))}
        </ul>
      ) : (
        <EmptyState
          icon={Ticket}
          title={list.query.trim() ? 'No matching tickets' : 'No tickets with this status'}
          description="Try a different search or tab to see your other tickets."
        />
      )}
      <Pagination
        page={list.page}
        totalPages={list.totalPages}
        totalItems={list.visible.length}
        pageSize={PAGE_SIZE}
        onChange={list.setPage}
      />
    </>
  );
}
