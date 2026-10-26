'use client';

import { Clock } from 'lucide-react';
import { useCurrentMinute } from '@/hooks/common/use-current-minute';
import { cn } from '@/lib/cn';
import { formatDate, formatRelative } from '@/lib/format';

const STALE_AFTER_HOURS = 48;

interface TicketAgeProps {
  createdAt: string;
  unresolved: boolean;
}

export function TicketAge({ createdAt, unresolved }: TicketAgeProps) {
  const minute = useCurrentMinute();
  const now = minute === null ? null : minute * 60000;
  const hours = now === null ? 0 : (now - new Date(createdAt).getTime()) / 3600000;
  const stale = unresolved && hours >= STALE_AFTER_HOURS;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 text-xs',
        stale ? 'font-medium text-red-600' : 'text-slate-400',
      )}
      title={stale ? 'Waiting for more than 48 hours' : undefined}
    >
      <Clock className="size-3.5" aria-hidden />
      {now === null ? formatDate(createdAt) : formatRelative(createdAt, now)}
    </span>
  );
}
