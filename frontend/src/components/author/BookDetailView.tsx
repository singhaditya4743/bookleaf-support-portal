'use client';

import { BookX, MessageSquarePlus } from 'lucide-react';
import { BookOverview } from '@/components/author/BookOverview';
import { BookRoyalty } from '@/components/author/BookRoyalty';
import { BookTickets } from '@/components/author/BookTickets';
import { PageHeader } from '@/components/layout/PageHeader';
import { LinkButton } from '@/components/ui/Button';
import { ErrorState } from '@/components/ui/ErrorState';
import { NotFoundState } from '@/components/ui/NotFoundState';
import { PageSkeleton } from '@/components/ui/PageSkeleton';
import { useAuthorBook } from '@/hooks/author/use-author-books';
import { useAuthorTickets } from '@/hooks/author/use-author-tickets';

const BACK = { href: '/author/books', label: 'My Books' };

export function BookDetailView({ bookId }: { bookId: string }) {
  const { book, error, loading, reload } = useAuthorBook(bookId);
  const { tickets } = useAuthorTickets(bookId);

  if (loading) return <PageSkeleton />;
  if (error && !book) return <ErrorState message={error.message} onRetry={reload} />;

  if (!book) {
    return (
      <NotFoundState
        icon={BookX}
        title="Book not found"
        description="It may have been removed, or it belongs to another account."
        back={BACK}
      />
    );
  }

  return (
    <>
      <PageHeader
        title={book.title}
        description={[book.genre, book.isbn && `ISBN ${book.isbn}`].filter(Boolean).join(' · ')}
        back={BACK}
        action={
          <LinkButton href={`/author/new-query?bookId=${book.id}`}>
            <MessageSquarePlus className="size-4" aria-hidden />
            Raise a query about this book
          </LinkButton>
        }
      />
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-3">
          <BookOverview book={book} />
          <BookTickets tickets={tickets} />
        </div>
        <div className="lg:col-span-2">
          <BookRoyalty book={book} />
        </div>
      </div>
    </>
  );
}
