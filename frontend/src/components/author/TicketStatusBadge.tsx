import { Badge } from '@/components/ui/Badge';
import { STATUS_LABELS, STATUS_TONES } from '@/lib/labels';
import { TicketStatus } from '@/types/ticket.types';

export function TicketStatusBadge({ status }: { status: TicketStatus }) {
  return <Badge tone={STATUS_TONES[status]}>{STATUS_LABELS[status]}</Badge>;
}
