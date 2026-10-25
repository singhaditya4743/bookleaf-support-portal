'use client';

import { BookOpen, MessageSquarePlus } from 'lucide-react';
import { BookCardList } from '@/components/author/BookCardList';
import { BookStats } from '@/components/author/BookStats';
import { BookTable } from '@/components/author/BookTable';
import { PageHeader } from '@/components/layout/PageHeader';
import { LinkButton } from '@/components/ui/Button';
import { Card, CardHeader } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAuthorBooks } from '@/hooks/use-author-books';

export default function MyBooksPage() {
  const { books, stats } = useAuthorBooks();

  return (
    <>
      <PageHeader
        title="My Books"
        description="Sales and royalty details for every book you have published with BookLeaf."
        action={
          <LinkButton href="/author/new-query">
            <MessageSquarePlus className="size-4" aria-hidden />
            New query
          </LinkButton>
        }
      />
      <BookStats stats={stats} />
      <Card className="mt-6 overflow-hidden">
        <CardHeader title="All books" description="Click a book to see its full details." />
        {books.length === 0 ? (
          <EmptyState
            icon={BookOpen}
            title="No books yet"
            description="Your books will appear here once they are added to your BookLeaf account."
          />
        ) : (
          <>
            <BookTable books={books} />
            <BookCardList books={books} />
          </>
        )}
      </Card>
    </>
  );
}
