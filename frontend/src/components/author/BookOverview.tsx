import { BookStatusBadge } from '@/components/author/BookStatusBadge';
import { Badge } from '@/components/ui/Badge';
import { Card, CardHeader } from '@/components/ui/Card';
import { formatDate } from '@/lib/format';
import { AuthorBook } from '@/types/book.types';

export function BookOverview({ book }: { book: AuthorBook }) {
  const details = [
    { label: 'Status', value: <BookStatusBadge status={book.status} /> },
    { label: 'Genre', value: book.genre ?? '—' },
    { label: 'ISBN', value: book.isbn ?? '—' },
    { label: 'Book ID', value: book.bookCode },
    { label: 'Published on', value: formatDate(book.publicationDate) },
    { label: 'Print partner', value: book.printPartner ?? '—' },
  ];

  return (
    <Card>
      <CardHeader title="Book details" />
      <dl className="grid gap-x-6 gap-y-4 px-5 py-5 sm:grid-cols-2">
        {details.map((item) => (
          <div key={item.label}>
            <dt className="text-xs text-slate-500">{item.label}</dt>
            <dd className="mt-1 text-sm font-medium text-slate-900">{item.value}</dd>
          </div>
        ))}
        <div className="sm:col-span-2">
          <dt className="text-xs text-slate-500">Available on</dt>
          <dd className="mt-1.5 flex flex-wrap gap-1.5">
            {book.availableOn.length ? (
              book.availableOn.map((store) => (
                <Badge key={store} tone="brand">
                  {store}
                </Badge>
              ))
            ) : (
              <span className="text-sm text-slate-500">Not listed yet</span>
            )}
          </dd>
        </div>
      </dl>
    </Card>
  );
}
