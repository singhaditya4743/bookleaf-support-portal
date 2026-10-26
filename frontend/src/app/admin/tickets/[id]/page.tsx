import { Suspense } from 'react';
import { AdminTicketView } from '@/components/admin/ticket/AdminTicketView';
import { PageSkeleton } from '@/components/ui/PageSkeleton';

export default function AdminTicketPage({ params }: PageProps<'/admin/tickets/[id]'>) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      {params.then(({ id }) => (
        <AdminTicketView ticketId={id} />
      ))}
    </Suspense>
  );
}
