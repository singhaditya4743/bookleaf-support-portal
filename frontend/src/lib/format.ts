const currency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

const number = new Intl.NumberFormat('en-IN');

const date = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

const dateTime = new Intl.DateTimeFormat('en-IN', {
  day: 'numeric',
  month: 'short',
  hour: 'numeric',
  minute: '2-digit',
});

export const formatCurrency = (value: number | null): string =>
  value === null ? '—' : currency.format(value);

export const formatNumber = (value: number): string => number.format(value);

export const formatDate = (value: string | null): string =>
  value ? date.format(new Date(value)) : '—';

export const formatDateTime = (value: string): string => dateTime.format(new Date(value));

export function formatRelative(value: string, now: number): string {
  const minutes = Math.round((now - new Date(value).getTime()) / 60000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return days < 7 ? `${days}d ago` : formatDate(value);
}
