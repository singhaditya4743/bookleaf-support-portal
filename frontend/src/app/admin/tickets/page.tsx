import { Suspense } from 'react';
import { AdminQueueView } from '@/components/admin/AdminQueueView';
import { PageSkeleton } from '@/components/ui/PageSkeleton';

export default function TicketQueuePage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <AdminQueueView />
    </Suspense>
  );
}
