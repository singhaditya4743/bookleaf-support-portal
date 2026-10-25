import { Badge } from '@/components/ui/Badge';
import { isPublished } from '@/lib/labels';

export function BookStatusBadge({ status }: { status: string }) {
  return <Badge tone={isPublished(status) ? 'green' : 'violet'}>{status}</Badge>;
}
