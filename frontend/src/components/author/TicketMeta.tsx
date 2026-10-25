import { Paperclip } from 'lucide-react';
import Link from 'next/link';
import { TicketStatusBadge } from '@/components/author/TicketStatusBadge';
import { Card, CardHeader } from '@/components/ui/Card';
import { formatDateTime } from '@/lib/format';
import { CATEGORY_LABELS } from '@/lib/labels';
import { AuthorTicketDetail } from '@/types/ticket.types';

export function TicketMeta({ ticket }: { ticket: AuthorTicketDetail }) {
  const rows = [
    { label: 'Status', value: <TicketStatusBadge status={ticket.status} /> },
    { label: 'Category', value: CATEGORY_LABELS[ticket.category] },
    {
      label: 'Book',
      value: ticket.book ? (
        <Link href={`/author/books/${ticket.book.id}`} className="text-brand-700 hover:underline">
          {ticket.book.title}
        </Link>
      ) : (
        'General / Account level'
      ),
    },
    { label: 'Raised on', value: formatDateTime(ticket.createdAt) },
    { label: 'Last update', value: formatDateTime(ticket.updatedAt) },
  ];

  if (ticket.resolvedAt) {
    rows.push({ label: 'Resolved on', value: formatDateTime(ticket.resolvedAt) });
  }

  return (
    <Card>
      <CardHeader title="Ticket details" />
      <dl className="space-y-4 px-5 py-5">
        {rows.map((row) => (
          <div key={row.label}>
            <dt className="text-xs text-slate-500">{row.label}</dt>
            <dd className="mt-1 text-sm font-medium text-slate-900">{row.value}</dd>
          </div>
        ))}
        {ticket.attachmentName && (
          <div>
            <dt className="text-xs text-slate-500">Attachment</dt>
            <dd className="mt-1 flex items-center gap-1.5 text-sm text-slate-700">
              <Paperclip className="size-3.5" aria-hidden />
              {ticket.attachmentName}
            </dd>
          </div>
        )}
      </dl>
    </Card>
  );
}
