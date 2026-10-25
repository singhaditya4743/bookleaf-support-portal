'use client';

import { MessageSquarePlus, Ticket } from 'lucide-react';
import { useState } from 'react';
import { StatusTabs } from '@/components/author/StatusTabs';
import { TicketRow } from '@/components/author/TicketRow';
import { PageHeader } from '@/components/layout/PageHeader';
import { LinkButton } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAuthorTickets } from '@/hooks/use-author-tickets';
import { TicketStatusFilter } from '@/types/ticket.types';

export default function MyTicketsPage() {
  const tickets = useAuthorTickets();
  const [filter, setFilter] = useState<TicketStatusFilter>('ALL');
  const visible = filter === 'ALL' ? tickets : tickets.filter((t) => t.status === filter);

  const newQuery = (
    <LinkButton href="/author/new-query">
      <MessageSquarePlus className="size-4" aria-hidden />
      New query
    </LinkButton>
  );

  return (
    <>
      <PageHeader
        title="My Tickets"
        description="Every query you have raised and the replies from the BookLeaf team."
        action={newQuery}
      />
      <Card className="overflow-hidden">
        <StatusTabs tickets={tickets} value={filter} onChange={setFilter} />
        {visible.length ? (
          <ul className="divide-y divide-slate-100">
            {visible.map((ticket) => (
              <TicketRow key={ticket.id} ticket={ticket} />
            ))}
          </ul>
        ) : (
          <EmptyState
            icon={Ticket}
            title={tickets.length ? 'No tickets with this status' : 'No queries yet'}
            description={
              tickets.length
                ? 'Try a different tab to see your other tickets.'
                : 'When you raise a query, you can follow its progress and replies here.'
            }
            action={tickets.length ? undefined : newQuery}
          />
        )}
      </Card>
    </>
  );
}
