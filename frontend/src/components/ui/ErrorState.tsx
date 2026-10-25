import { CloudOff, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <Card>
      <EmptyState
        icon={CloudOff}
        title="Couldn't load this page"
        description={message}
        action={
          <Button variant="secondary" onClick={onRetry}>
            <RotateCw className="size-4" aria-hidden />
            Try again
          </Button>
        }
      />
    </Card>
  );
}
