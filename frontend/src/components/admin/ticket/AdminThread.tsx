'use client';

import { MessageBubble } from '@/components/tickets/MessageBubble';
import { Card, CardHeader } from '@/components/ui/Card';
import { useAdminTicketContext } from '@/hooks/admin/use-admin-ticket-context';
import { getInitials } from '@/lib/initials';

export function AdminThread() {
  const { ticket } = useAdminTicketContext();
  const authorInitials = getInitials(ticket.author.name);

  return (
    <Card>
      <CardHeader title="Conversation" />
      <div className="space-y-6 bg-slate-50/60 px-5 py-6">
        <MessageBubble
          author={ticket.author.name}
          avatar={authorInitials}
          body={ticket.description}
          createdAt={ticket.createdAt}
          fromTeam={false}
          mine={false}
        />
        {ticket.messages.map((message) => {
          const fromTeam = message.senderRole === 'ADMIN';
          return (
            <MessageBubble
              key={message.id}
              author={message.senderName}
              avatar={fromTeam ? 'BL' : authorInitials}
              body={message.body}
              createdAt={message.createdAt}
              fromTeam={fromTeam}
              mine={fromTeam}
            />
          );
        })}
      </div>
    </Card>
  );
}
