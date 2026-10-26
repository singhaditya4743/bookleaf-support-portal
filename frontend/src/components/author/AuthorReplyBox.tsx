'use client';

import { Send } from 'lucide-react';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader } from '@/components/ui/Card';
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
  const closed = status === 'RESOLVED' || status === 'CLOSED';

  return (
    <Card>
      <CardHeader
        title="Add a reply"
        description={
          closed
            ? 'This ticket is closed. Sending a reply will reopen it for our team.'
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
            {sending ? 'Sending…' : closed ? 'Reply and reopen' : 'Send reply'}
          </Button>
        </div>
      </form>
    </Card>
  );
}
