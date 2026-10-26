'use client';

import { FormEvent, useCallback, useState } from 'react';
import { useAdminTicketContext } from '@/hooks/admin/use-admin-ticket-context';
import { useAutoDraft } from '@/hooks/admin/use-auto-draft';
import { useUnsavedWarning } from '@/hooks/common/use-unsaved-warning';
import { REPLY_LIMITS } from '@/lib/validation';

export function useReplyComposer() {
  const { ticket, actions } = useAdminTicketContext();
  const [text, setText] = useState(ticket.aiDraft ?? '');
  const [draftAt, setDraftAt] = useState(ticket.aiDraftAt);
  const [edited, setEdited] = useState(false);
  const [sent, setSent] = useState(false);

  useAutoDraft();
  useUnsavedWarning(edited && text.trim().length > 0);

  if (ticket.aiDraftAt !== draftAt) {
    setDraftAt(ticket.aiDraftAt);
    if (!edited) setText(ticket.aiDraft ?? '');
  }

  const change = useCallback((value: string) => {
    setText(value);
    setEdited(true);
    setSent(false);
  }, []);

  const { regenerateDraft, reply } = actions;

  const regenerate = useCallback(async () => {
    setEdited(false);
    await regenerateDraft();
  }, [regenerateDraft]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = text.trim();
    if (body.length < REPLY_LIMITS.min) return;
    if (await reply(body)) {
      setText('');
      setEdited(false);
      setSent(true);
    }
  };

  const fromDraft = !edited && Boolean(ticket.aiDraft) && text === ticket.aiDraft;

  return { text, fromDraft, sent, change, regenerate, submit };
}
