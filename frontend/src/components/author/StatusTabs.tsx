import { useMemo } from 'react';
import { cn } from '@/lib/cn';
import { STATUS_LABELS } from '@/lib/labels';
import { AuthorTicketSummary, TicketStatusFilter } from '@/types/ticket.types';

const FILTERS: TicketStatusFilter[] = ['ALL', 'OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'];

interface StatusTabsProps {
  tickets: AuthorTicketSummary[];
  value: TicketStatusFilter;
  onChange: (value: TicketStatusFilter) => void;
}

const countByStatus = (tickets: AuthorTicketSummary[]) =>
  tickets.reduce<Record<TicketStatusFilter, number>>(
    (counts, ticket) => ({ ...counts, [ticket.status]: counts[ticket.status] + 1 }),
    { ALL: tickets.length, OPEN: 0, IN_PROGRESS: 0, RESOLVED: 0, CLOSED: 0 },
  );

export function StatusTabs({ tickets, value, onChange }: StatusTabsProps) {
  const counts = useMemo(() => countByStatus(tickets), [tickets]);

  return (
    <div role="tablist" className="flex gap-1 overflow-x-auto border-b border-slate-200 px-3">
      {FILTERS.map((filter) => (
        <button
          key={filter}
          type="button"
          role="tab"
          aria-selected={value === filter}
          onClick={() => onChange(filter)}
          className={cn(
            '-mb-px flex items-center gap-2 border-b-2 px-3 py-3 text-sm font-medium whitespace-nowrap',
            value === filter
              ? 'border-brand-600 text-brand-700'
              : 'border-transparent text-slate-500 hover:text-slate-800',
          )}
        >
          {filter === 'ALL' ? 'All' : STATUS_LABELS[filter]}
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
            {counts[filter]}
          </span>
        </button>
      ))}
    </div>
  );
}
