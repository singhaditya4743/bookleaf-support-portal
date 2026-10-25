import { Suspense } from 'react';
import { BookDetailView } from '@/components/author/BookDetailView';
import { PageSkeleton } from '@/components/ui/PageSkeleton';

export default function BookDetailPage({ params }: PageProps<'/author/books/[id]'>) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      {params.then(({ id }) => (
        <BookDetailView bookId={id} />
      ))}
    </Suspense>
  );
}
