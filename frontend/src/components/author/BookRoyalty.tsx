import { Hammer } from 'lucide-react';
import { Card, CardHeader } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { formatCurrency, formatDate, formatNumber } from '@/lib/format';
import { isPublished } from '@/lib/labels';
import { AuthorBook } from '@/types/book.types';

export function BookRoyalty({ book }: { book: AuthorBook }) {
  if (!isPublished(book.status)) {
    return (
      <Card>
        <EmptyState
          icon={Hammer}
          title={book.status}
          description="Sales and royalty details will appear here once your book is published and live."
        />
      </Card>
    );
  }

  const rows = [
    { label: 'MRP', value: formatCurrency(book.mrp) },
    { label: 'Royalty per copy', value: formatCurrency(book.royaltyPerCopy) },
    { label: 'Copies sold', value: formatNumber(book.copiesSold) },
    { label: 'Royalty earned', value: formatCurrency(book.royaltyEarned) },
    { label: 'Royalty paid', value: formatCurrency(book.royaltyPaid) },
    {
      label: 'Last payout',
      value: book.lastPayoutAt ? formatDate(book.lastPayoutAt) : 'No payout yet',
    },
  ];

  return (
    <Card>
      <CardHeader title="Sales & royalty" />
      <div className="px-5 py-5">
        <div className="rounded-lg bg-amber-50 p-4 ring-1 ring-amber-100">
          <p className="text-xs font-medium text-amber-800">Royalty pending</p>
          <p className="mt-1 text-2xl font-semibold text-amber-900">
            {formatCurrency(book.royaltyPending)}
          </p>
        </div>
        <dl className="mt-4 divide-y divide-slate-100">
          {rows.map((row) => (
            <div key={row.label} className="flex justify-between py-2.5 text-sm">
              <dt className="text-slate-500">{row.label}</dt>
              <dd className="font-medium text-slate-900">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Card>
  );
}
