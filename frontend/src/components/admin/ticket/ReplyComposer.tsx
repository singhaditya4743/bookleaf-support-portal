'use client';

import { CheckCircle2, Send, Sparkles } from 'lucide-react';
import { Alert } from '@/components/ui/Alert';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader } from '@/components/ui/Card';
import { Textarea } from '@/components/ui/inputs';
import { useAdminTicketContext } from '@/hooks/admin/use-admin-ticket-context';
import { useReplyComposer } from '@/hooks/admin/use-reply-composer';
import { REPLY_LIMITS } from '@/lib/validation';

export function ReplyComposer() {
  const { ticket, actions } = useAdminTicketContext();
  const { text, fromDraft, sent, change, regenerate, submit } = useReplyComposer();
  const drafting = actions.pending === 'draft';
  const sending = actions.pending === 'reply';
  const error = actions.error?.action === 'draft' || actions.error?.action === 'reply';

  const placeholder = ticket.aiDraft
    ? 'Write your reply to the author…'
    : 'The AI draft is not ready yet. Generate one, or write the reply yourself.';

  return (
    <Card>
      <CardHeader
        title="Reply to author"
        description="The author sees this reply on their ticket instantly."
        action={
          <Button variant="secondary" size="sm" onClick={regenerate} disabled={drafting}>
            <Sparkles className="size-4" aria-hidden />
            {drafting
              ? 'Generating…'
              : ticket.aiDraft
                ? 'Regenerate AI draft'
                : 'Generate AI draft'}
          </Button>
        }
      />
      <form onSubmit={submit} className="space-y-3 px-5 py-5">
        {error && actions.error && <Alert message={actions.error.message} />}
        {fromDraft && (
          <Badge tone="violet">
            <Sparkles className="size-3" aria-hidden />
            AI draft from the knowledge base · review and edit before sending
          </Badge>
        )}
        <Textarea
          aria-label="Reply"
          rows={10}
          maxLength={REPLY_LIMITS.max}
          placeholder={placeholder}
          value={text}
          disabled={drafting}
          onChange={(event) => change(event.target.value)}
        />
        <div className="flex flex-wrap items-center justify-between gap-3">
          {sent ? (
            <p className="flex items-center gap-1.5 text-sm text-emerald-700">
              <CheckCircle2 className="size-4" aria-hidden />
              Reply sent to the author
            </p>
          ) : (
            <p className="text-xs text-slate-500">
              {text.trim().length} / {REPLY_LIMITS.max}
            </p>
          )}
          <Button type="submit" disabled={sending || text.trim().length < REPLY_LIMITS.min}>
            <Send className="size-4" aria-hidden />
            {sending ? 'Sending…' : 'Send reply'}
          </Button>
        </div>
      </form>
    </Card>
  );
}
