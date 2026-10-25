'use client';

import { useRouter } from 'next/navigation';
import { BookStatusBadge } from '@/components/author/BookStatusBadge';
import { formatCurrency, formatDate, formatNumber } from '@/lib/format';
import { AuthorBook } from '@/types/book.types';

const HEADERS = ['Book', 'Status', 'Published', 'MRP', 'Copies', 'Earned', 'Paid', 'Pending'];

export function BookTable({ books }: { books: AuthorBook[] }) {
  const router = useRouter();

  return (
    <div className="hidden overflow-x-auto md:block">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-slate-200 bg-slate-50 text-xs font-medium text-slate-500 uppercase">
          <tr>
            {HEADERS.map((header, index) => (
              <th key={header} className={index > 2 ? 'px-4 py-3 text-right' : 'px-4 py-3'}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {books.map((book) => (
            <tr
              key={book.id}
              onClick={() => router.push(`/author/books/${book.id}`)}
              className="cursor-pointer hover:bg-slate-50"
            >
              <td className="px-4 py-3.5">
                <p className="font-medium text-slate-900">{book.title}</p>
                <p className="text-xs text-slate-500">
                  {book.genre ?? '—'} · ISBN {book.isbn ?? '—'}
                </p>
              </td>
              <td className="px-4 py-3.5">
                <BookStatusBadge status={book.status} />
              </td>
              <td className="px-4 py-3.5 whitespace-nowrap text-slate-600">
                {formatDate(book.publicationDate)}
              </td>
              <td className="px-4 py-3.5 text-right">{formatCurrency(book.mrp)}</td>
              <td className="px-4 py-3.5 text-right">{formatNumber(book.copiesSold)}</td>
              <td className="px-4 py-3.5 text-right">{formatCurrency(book.royaltyEarned)}</td>
              <td className="px-4 py-3.5 text-right">{formatCurrency(book.royaltyPaid)}</td>
              <td className="px-4 py-3.5 text-right font-semibold text-amber-700">
                {formatCurrency(book.royaltyPending)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
