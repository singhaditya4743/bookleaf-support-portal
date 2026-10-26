'use client';

import { Lock, Send } from 'lucide-react';
import { Alert } from '@/components/ui/Alert';
import { Button, LinkButton } from '@/components/ui/Button';
import { Card, CardHeader } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { Textarea } from '@/components/ui/inputs';
import { useAuthorReply } from '@/hooks/author/use-author-reply';
import { REPLY_LIMITS } from '@/lib/validation';
import { TicketMessage, TicketStatus } from '@/types/ticket.types';

interface AuthorReplyBoxProps {
  ticketId: string;
  status: TicketStatus;
  onSent: (message: TicketMessage) => void;
}

export function AuthorReplyBox({ ticketId, status, onSent }: AuthorReplyBoxProps) {
  const { text, setText, sending, error, submit } = useAuthorReply(ticketId, onSent);
  const resolved = status === 'RESOLVED';

  if (status === 'CLOSED') {
    return (
      <Card>
        <EmptyState
          icon={Lock}
          title="This ticket is closed"
          description="Replies are turned off for closed tickets. If you still need help, please raise a new query."
          action={<LinkButton href="/author/new-query">Raise a new query</LinkButton>}
        />
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader
        title="Add a reply"
        description={
          resolved
            ? 'This ticket is resolved. Sending a reply will reopen it for our team.'
            : 'Share more details or answer a question from our team.'
        }
      />
      <form onSubmit={submit} className="space-y-3 px-5 py-5">
        {error && <Alert message={error} />}
        <Textarea
          aria-label="Your reply"
          rows={4}
          maxLength={REPLY_LIMITS.max}
          placeholder="Write your message…"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={sending || text.trim().length < REPLY_LIMITS.min}>
            <Send className="size-4" aria-hidden />
            {sending ? 'Sending…' : resolved ? 'Reply and reopen' : 'Send reply'}
          </Button>
        </div>
      </form>
    </Card>
  );
}
