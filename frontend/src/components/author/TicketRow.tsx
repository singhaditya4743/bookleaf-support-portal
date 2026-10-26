import { BookOpen, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { memo } from 'react';
import { TicketStatusBadge } from '@/components/tickets/TicketStatusBadge';
import { RelativeTime } from '@/components/ui/RelativeTime';
import { CATEGORY_LABELS } from '@/lib/labels';
import { AuthorTicketSummary } from '@/types/ticket.types';

export const TicketRow = memo(function TicketRow({ ticket }: { ticket: AuthorTicketSummary }) {
  return (
    <li>
      <Link
        href={`/author/tickets/${ticket.id}`}
        className="flex flex-col gap-2 px-5 py-4 hover:bg-slate-50 sm:flex-row sm:items-center sm:gap-4"
      >
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-slate-900">{ticket.subject}</p>
          <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
            <span>{CATEGORY_LABELS[ticket.category]}</span>
            <span className="inline-flex items-center gap-1">
              <BookOpen className="size-3.5" aria-hidden />
              {ticket.book?.title ?? 'General / Account'}
            </span>
            <span className="inline-flex items-center gap-1">
              <MessageCircle className="size-3.5" aria-hidden />
              {ticket.replyCount} {ticket.replyCount === 1 ? 'reply' : 'replies'}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:gap-1">
          <TicketStatusBadge status={ticket.status} />
          <span className="text-xs text-slate-400">
            Updated <RelativeTime value={ticket.updatedAt} />
          </span>
        </div>
      </Link>
    </li>
  );
});
