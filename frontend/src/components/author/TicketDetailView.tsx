'use client';

import { TicketX } from 'lucide-react';
import { AuthorReplyBox } from '@/components/author/AuthorReplyBox';
import { TicketMeta } from '@/components/author/TicketMeta';
import { TicketThread } from '@/components/author/TicketThread';
import { PageHeader } from '@/components/layout/PageHeader';
import { ErrorState } from '@/components/ui/ErrorState';
import { NotFoundState } from '@/components/ui/NotFoundState';
import { PageSkeleton } from '@/components/ui/PageSkeleton';
import { useAuthorTicket } from '@/hooks/author/use-author-ticket';
import { isNotFound } from '@/lib/api/api-error';

const BACK = { href: '/author/tickets', label: 'My Tickets' };

export function TicketDetailView({ ticketId }: { ticketId: string }) {
  const { ticket, error, loading, reload, addMessage } = useAuthorTicket(ticketId);

  if (loading) return <PageSkeleton />;

  if (!ticket && isNotFound(error)) {
    return (
      <NotFoundState
        icon={TicketX}
        title="Ticket not found"
        description="It may not exist, or it belongs to another account."
        back={BACK}
      />
    );
  }

  if (!ticket) {
    return <ErrorState message={error?.message ?? 'Ticket unavailable.'} onRetry={reload} />;
  }

  return (
    <>
      <PageHeader title={ticket.subject} back={BACK} />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <TicketThread ticket={ticket} />
          <AuthorReplyBox ticketId={ticket.id} status={ticket.status} onSent={addMessage} />
        </div>
        <TicketMeta ticket={ticket} />
      </div>
    </>
  );
}
