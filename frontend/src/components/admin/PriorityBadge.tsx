import { Badge } from '@/components/ui/Badge';
import { PRIORITY_LABELS, PRIORITY_TONES } from '@/lib/labels';
import { TicketPriority } from '@/types/admin-ticket.types';

export function PriorityBadge({ priority }: { priority: TicketPriority }) {
  return <Badge tone={PRIORITY_TONES[priority]}>{PRIORITY_LABELS[priority]}</Badge>;
}
