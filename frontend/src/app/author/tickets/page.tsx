'use client';

import { MessageSquarePlus } from 'lucide-react';
import { TicketList } from '@/components/author/TicketList';
import { PageHeader } from '@/components/layout/PageHeader';
import { LinkButton } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ErrorState } from '@/components/ui/ErrorState';
import { PageSkeleton } from '@/components/ui/PageSkeleton';
import { useAuthorTickets } from '@/hooks/author/use-author-tickets';

const newQuery = (
  <LinkButton href="/author/new-query">
    <MessageSquarePlus className="size-4" aria-hidden />
    New query
  </LinkButton>
);

export default function MyTicketsPage() {
  const { tickets, error, loading, reload } = useAuthorTickets();

  if (loading) return <PageSkeleton />;

  return (
    <>
      <PageHeader
        title="My Tickets"
        description="Every query you have raised and the replies from the BookLeaf team."
        action={newQuery}
      />
      {error && !tickets.length ? (
        <ErrorState message={error.message} onRetry={reload} />
      ) : (
        <Card className="overflow-hidden">
          <TicketList tickets={tickets} emptyAction={newQuery} />
        </Card>
      )}
    </>
  );
}
