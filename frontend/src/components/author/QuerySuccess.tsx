import { CheckCircle2 } from 'lucide-react';
import { Button, LinkButton } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface QuerySuccessProps {
  ticketId: string;
  onNewQuery: () => void;
}

export function QuerySuccess({ ticketId, onNewQuery }: QuerySuccessProps) {
  return (
    <Card className="flex flex-col items-center px-6 py-14 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-brand-50 text-brand-600">
        <CheckCircle2 className="size-6" aria-hidden />
      </span>
      <h2 className="mt-4 text-lg font-semibold text-slate-900">Your query has been submitted</h2>
      <p className="mt-1 max-w-md text-sm text-slate-500">
        Our team usually responds within 24–48 hours. You will see every reply on the ticket page as
        soon as it is sent.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <LinkButton href={`/author/tickets/${ticketId}`}>View this ticket</LinkButton>
        <Button variant="secondary" onClick={onNewQuery}>
          Raise another query
        </Button>
      </div>
    </Card>
  );
}
