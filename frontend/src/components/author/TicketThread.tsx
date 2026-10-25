import { Clock } from 'lucide-react';
import { MessageBubble } from '@/components/author/MessageBubble';
import { Card, CardHeader } from '@/components/ui/Card';
import { AuthorTicketDetail } from '@/types/ticket.types';

export function TicketThread({ ticket }: { ticket: AuthorTicketDetail }) {
  return (
    <Card>
      <CardHeader title="Conversation" />
      <div className="space-y-6 bg-slate-50/60 px-5 py-6">
        <MessageBubble
          author="You"
          body={ticket.description}
          createdAt={ticket.createdAt}
          fromTeam={false}
        />
        {ticket.messages.map((message) => (
          <MessageBubble
            key={message.id}
            author={message.senderRole === 'ADMIN' ? message.senderName : 'You'}
            body={message.body}
            createdAt={message.createdAt}
            fromTeam={message.senderRole === 'ADMIN'}
          />
        ))}
        {ticket.messages.length === 0 && (
          <p className="flex items-center justify-center gap-2 text-sm text-slate-500">
            <Clock className="size-4" aria-hidden />
            Our team will reply here, usually within 24–48 hours.
          </p>
        )}
      </div>
    </Card>
  );
}
