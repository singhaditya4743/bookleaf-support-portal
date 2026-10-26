'use client';

import { Lock, StickyNote } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader } from '@/components/ui/Card';
import { Textarea } from '@/components/ui/inputs';
import { useAdminTicketContext } from '@/hooks/admin/use-admin-ticket-context';
import { formatDateTime } from '@/lib/format';

const NOTE_MIN = 2;

export function InternalNotes() {
  const { ticket, actions } = useAdminTicketContext();
  const [text, setText] = useState('');
  const saving = actions.pending === 'note';

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (await actions.addNote(text.trim())) setText('');
  };

  return (
    <Card>
      <CardHeader
        title="Internal notes"
        description="Only visible to the BookLeaf team, never to the author."
        action={<Lock className="size-4 text-slate-400" aria-hidden />}
      />
      <div className="space-y-4 px-5 py-5">
        {ticket.notes.length === 0 && (
          <p className="flex items-center gap-2 text-sm text-slate-500">
            <StickyNote className="size-4" aria-hidden />
            No notes yet.
          </p>
        )}
        {ticket.notes.map((note) => (
          <div key={note.id} className="rounded-lg bg-amber-50 px-4 py-3 ring-1 ring-amber-100">
            <p className="text-xs text-amber-800">
              <span className="font-medium">{note.adminName}</span> ·{' '}
              {formatDateTime(note.createdAt)}
            </p>
            <p className="mt-1 text-sm whitespace-pre-line text-slate-800">{note.body}</p>
          </div>
        ))}
        <form onSubmit={submit} className="space-y-3">
          {actions.error?.action === 'note' && <Alert message={actions.error.message} />}
          <Textarea
            aria-label="New internal note"
            rows={3}
            maxLength={2000}
            placeholder="Add context for the team, e.g. checked bank details, escalated to production…"
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              variant="secondary"
              size="sm"
              disabled={saving || text.trim().length < NOTE_MIN}
            >
              {saving ? 'Saving…' : 'Add note'}
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
}
