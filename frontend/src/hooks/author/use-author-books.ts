'use client';

import { useMemo } from 'react';
import { useApiQuery } from '@/hooks/common/use-api-query';
import { AUTHOR_API } from '@/services/author.service';
import { AuthorBook, BookStatsSummary } from '@/types/book.types';

const NO_BOOKS: AuthorBook[] = [];

const summarize = (books: AuthorBook[]): BookStatsSummary =>
  books.reduce<BookStatsSummary>(
    (acc, book) => ({
      totalBooks: acc.totalBooks + 1,
      copiesSold: acc.copiesSold + book.copiesSold,
      royaltyEarned: acc.royaltyEarned + book.royaltyEarned,
      royaltyPending: acc.royaltyPending + book.royaltyPending,
    }),
    { totalBooks: 0, copiesSold: 0, royaltyEarned: 0, royaltyPending: 0 },
  );

export function useAuthorBooks() {
  const { data, error, loading, reload } = useApiQuery<AuthorBook[]>(AUTHOR_API.books);
  const books = data ?? NO_BOOKS;
  const stats = useMemo(() => summarize(books), [books]);

  return { books, stats, error, loading: loading && !data, reload };
}

export function useAuthorBook(bookId: string) {
  const { books, error, loading, reload } = useAuthorBooks();
  const book = useMemo(() => books.find((item) => item.id === bookId) ?? null, [books, bookId]);

  return { book, error, loading, reload };
}
