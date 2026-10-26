'use client';

import { Paperclip } from 'lucide-react';
import { Card, CardHeader } from '@/components/ui/Card';
import { useAdminTicketContext } from '@/hooks/admin/use-admin-ticket-context';
import { formatDateTime } from '@/lib/format';

export function TicketInfo() {
  const { ticket } = useAdminTicketContext();

  const rows = [
    { label: 'Author', value: ticket.author.name },
    { label: 'Email', value: ticket.author.email },
    { label: 'Book', value: ticket.book?.title ?? 'General / Account level' },
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
            <dd className="mt-1 text-sm font-medium break-words text-slate-900">{row.value}</dd>
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
