import { BookOpen, MessageCircle, UserRound } from 'lucide-react';
import Link from 'next/link';
import { memo } from 'react';
import { PriorityBadge } from '@/components/admin/PriorityBadge';
import { TicketAge } from '@/components/admin/TicketAge';
import { TicketStatusBadge } from '@/components/tickets/TicketStatusBadge';
import { cn } from '@/lib/cn';
import { CATEGORY_LABELS } from '@/lib/labels';
import { AdminTicketSummary } from '@/types/admin-ticket.types';

const URGENT_BORDER = { CRITICAL: 'border-l-red-500', HIGH: 'border-l-amber-400' };

export const QueueRow = memo(function QueueRow({ ticket }: { ticket: AdminTicketSummary }) {
  const unresolved = ticket.status === 'OPEN' || ticket.status === 'IN_PROGRESS';
  const accent =
    unresolved && (ticket.priority === 'CRITICAL' || ticket.priority === 'HIGH')
      ? URGENT_BORDER[ticket.priority]
      : 'border-l-transparent';

  return (
    <li>
      <Link
        href={`/admin/tickets/${ticket.id}`}
        className={cn(
          'flex flex-col gap-2 border-l-4 px-5 py-4 hover:bg-slate-50 sm:flex-row sm:items-center sm:gap-4',
          accent,
        )}
      >
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-slate-900">{ticket.subject}</p>
          <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
            <span className="font-medium text-slate-700">{ticket.author.name}</span>
            <span>{CATEGORY_LABELS[ticket.category]}</span>
            <span className="inline-flex items-center gap-1">
              <BookOpen className="size-3.5" aria-hidden />
              {ticket.book?.title ?? 'General / Account'}
            </span>
            <span className="inline-flex items-center gap-1">
              <MessageCircle className="size-3.5" aria-hidden />
              {ticket.replyCount}
            </span>
            <span className="inline-flex items-center gap-1">
              <UserRound className="size-3.5" aria-hidden />
              {ticket.assignedTo?.name ?? 'Unassigned'}
            </span>
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:flex-col sm:items-end sm:gap-1.5">
          <div className="flex gap-1.5">
            <PriorityBadge priority={ticket.priority} />
            <TicketStatusBadge status={ticket.status} />
          </div>
          <TicketAge createdAt={ticket.createdAt} unresolved={unresolved} />
        </div>
      </Link>
    </li>
  );
});
