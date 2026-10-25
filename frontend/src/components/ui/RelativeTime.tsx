'use client';

import { useCurrentMinute } from '@/hooks/use-current-minute';
import { formatDate, formatDateTime, formatRelative } from '@/lib/format';

export function RelativeTime({ value }: { value: string }) {
  const minute = useCurrentMinute();
  const text = minute === null ? formatDate(value) : formatRelative(value, minute * 60000);

  return (
    <time dateTime={value} title={formatDateTime(value)}>
      {text}
    </time>
  );
}
