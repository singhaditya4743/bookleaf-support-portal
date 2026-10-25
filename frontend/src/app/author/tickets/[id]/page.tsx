import { Suspense } from 'react';
import { TicketDetailView } from '@/components/author/TicketDetailView';
import { PageSkeleton } from '@/components/ui/PageSkeleton';

export default function TicketDetailPage({ params }: PageProps<'/author/tickets/[id]'>) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      {params.then(({ id }) => (
        <TicketDetailView ticketId={id} />
      ))}
    </Suspense>
  );
}
