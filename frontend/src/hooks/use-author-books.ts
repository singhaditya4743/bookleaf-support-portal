import { MOCK_BOOKS } from '@/mocks/books.mock';
import { AuthorBook, BookStatsSummary } from '@/types/book.types';

export function useAuthorBooks(): { books: AuthorBook[]; stats: BookStatsSummary } {
  const books = MOCK_BOOKS;
  const stats = books.reduce<BookStatsSummary>(
    (acc, book) => ({
      totalBooks: acc.totalBooks + 1,
      copiesSold: acc.copiesSold + book.copiesSold,
      royaltyEarned: acc.royaltyEarned + book.royaltyEarned,
      royaltyPending: acc.royaltyPending + book.royaltyPending,
    }),
    { totalBooks: 0, copiesSold: 0, royaltyEarned: 0, royaltyPending: 0 },
  );
  return { books, stats };
}

export function useAuthorBook(bookId: string): AuthorBook | null {
  return MOCK_BOOKS.find((book) => book.id === bookId) ?? null;
}
