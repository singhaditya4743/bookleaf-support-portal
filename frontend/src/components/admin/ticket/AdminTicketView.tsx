'use client';

import { TicketX } from 'lucide-react';
import { useMemo, useState } from 'react';
import { PriorityBadge } from '@/components/admin/PriorityBadge';
import { AdminThread } from '@/components/admin/ticket/AdminThread';
import { InternalNotes } from '@/components/admin/ticket/InternalNotes';
import { ReplyComposer } from '@/components/admin/ticket/ReplyComposer';
import { TicketControls } from '@/components/admin/ticket/TicketControls';
import { TicketInfo } from '@/components/admin/ticket/TicketInfo';
import { PageHeader } from '@/components/layout/PageHeader';
import { TicketStatusBadge } from '@/components/tickets/TicketStatusBadge';
import { ErrorState } from '@/components/ui/ErrorState';
import { NotFoundState } from '@/components/ui/NotFoundState';
import { PageSkeleton } from '@/components/ui/PageSkeleton';
import { AdminTicketContext } from '@/context/admin-ticket.context';
import { useAdminTicket } from '@/hooks/admin/use-admin-ticket';
import { useTicketActions } from '@/hooks/admin/use-ticket-actions';
import { isNotFound } from '@/lib/api/api-error';
import { readQueueQuery } from '@/lib/queue-query';

export function AdminTicketView({ ticketId }: { ticketId: string }) {
  const { data: ticket, error, loading, reload, setData } = useAdminTicket(ticketId);
  const actions = useTicketActions(ticketId, setData);
  const value = useMemo(() => (ticket ? { ticket, actions } : null), [ticket, actions]);
  const [back] = useState(() => ({
    href: `/admin/tickets${readQueueQuery()}`,
    label: 'Ticket Queue',
  }));

  if (loading) return <PageSkeleton />;

  if (!value && isNotFound(error)) {
    return (
      <NotFoundState
        icon={TicketX}
        title="Ticket not found"
        description="This ticket does not exist or was removed."
        back={back}
      />
    );
  }

  if (!value) {
    return <ErrorState message={error?.message ?? 'Ticket unavailable.'} onRetry={reload} />;
  }

  return (
    <AdminTicketContext value={value}>
      <PageHeader
        title={value.ticket.subject}
        description={`Raised by ${value.ticket.author.name}`}
        back={back}
        action={
          <div className="flex gap-2">
            <PriorityBadge priority={value.ticket.priority} />
            <TicketStatusBadge status={value.ticket.status} />
          </div>
        }
      />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <AdminThread />
          <ReplyComposer />
          <InternalNotes />
        </div>
        <div className="space-y-6">
          <TicketControls />
          <TicketInfo />
        </div>
      </div>
    </AdminTicketContext>
  );
}
