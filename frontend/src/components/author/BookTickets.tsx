import { Ticket } from 'lucide-react';
import { TicketRow } from '@/components/author/TicketRow';
import { Card, CardHeader } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { AuthorTicketSummary } from '@/types/ticket.types';

export function BookTickets({ tickets }: { tickets: AuthorTicketSummary[] }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader title="Queries about this book" />
      {tickets.length ? (
        <ul className="divide-y divide-slate-100">
          {tickets.map((ticket) => (
            <TicketRow key={ticket.id} ticket={ticket} />
          ))}
        </ul>
      ) : (
        <EmptyState
          icon={Ticket}
          title="No queries yet"
          description="If something looks off with this book, raise a query and our team will get back to you."
        />
      )}
    </Card>
  );
}
