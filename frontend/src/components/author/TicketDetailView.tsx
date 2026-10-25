'use client';

import { TicketX } from 'lucide-react';
import { TicketMeta } from '@/components/author/TicketMeta';
import { TicketThread } from '@/components/author/TicketThread';
import { PageHeader } from '@/components/layout/PageHeader';
import { LinkButton } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { LiveIndicator } from '@/components/ui/LiveIndicator';
import { useAuthorTicket } from '@/hooks/use-author-tickets';

const BACK = { href: '/author/tickets', label: 'My Tickets' };

export function TicketDetailView({ ticketId }: { ticketId: string }) {
  const ticket = useAuthorTicket(ticketId);

  if (!ticket) {
    return (
      <>
        <PageHeader title="Ticket not found" back={BACK} />
        <Card>
          <EmptyState
            icon={TicketX}
            title="We couldn't find this ticket"
            description="It may not exist, or it belongs to another account."
            action={<LinkButton href="/author/tickets">Back to My Tickets</LinkButton>}
          />
        </Card>
      </>
    );
  }

  return (
    <>
      <PageHeader title={ticket.subject} back={BACK} action={<LiveIndicator />} />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TicketThread ticket={ticket} />
        </div>
        <TicketMeta ticket={ticket} />
      </div>
    </>
  );
}
