'use client';

import { useSearchParams } from 'next/navigation';
import { QueryFormFields } from '@/components/author/QueryFormFields';
import { Card } from '@/components/ui/Card';
import { ErrorState } from '@/components/ui/ErrorState';
import { useAuthorBooks } from '@/hooks/author/use-author-books';

export function QueryForm() {
  const { books, error, loading, reload } = useAuthorBooks();
  const preselected = useSearchParams().get('bookId') ?? '';

  if (loading) return <Card className="h-96 animate-pulse" />;
  if (error && !books.length) return <ErrorState message={error.message} onRetry={reload} />;

  const initialBookId = books.some((book) => book.id === preselected) ? preselected : '';
  return <QueryFormFields key={initialBookId} books={books} initialBookId={initialBookId} />;
}
