import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { BookStatusBadge } from '@/components/author/BookStatusBadge';
import { formatCurrency, formatNumber } from '@/lib/format';
import { AuthorBook } from '@/types/book.types';

export function BookCardList({ books }: { books: AuthorBook[] }) {
  return (
    <ul className="divide-y divide-slate-100 md:hidden">
      {books.map((book) => (
        <li key={book.id}>
          <Link href={`/author/books/${book.id}`} className="flex items-center gap-3 px-4 py-4">
            <div className="min-w-0 flex-1 space-y-2">
              <p className="font-medium text-slate-900">{book.title}</p>
              <BookStatusBadge status={book.status} />
              <p className="text-xs text-slate-500">
                {formatNumber(book.copiesSold)} sold · Pending{' '}
                <span className="font-semibold text-amber-700">
                  {formatCurrency(book.royaltyPending)}
                </span>
              </p>
            </div>
            <ChevronRight className="size-4 text-slate-400" aria-hidden />
          </Link>
        </li>
      ))}
    </ul>
  );
}
