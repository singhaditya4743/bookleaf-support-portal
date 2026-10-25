import { Suspense } from 'react';
import { QueryForm } from '@/components/author/QueryForm';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';

export default function NewQueryPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="Raise a new query"
        description="Tell us what you need help with. Our support team will get back to you with a clear next step."
      />
      <Suspense fallback={<Card className="h-96 animate-pulse" />}>
        <QueryForm />
      </Suspense>
    </div>
  );
}
