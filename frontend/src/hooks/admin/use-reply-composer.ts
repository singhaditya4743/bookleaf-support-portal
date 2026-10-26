'use client';

import { FormEvent, useCallback, useState } from 'react';
import { useAdminTicketContext } from '@/hooks/admin/use-admin-ticket-context';

export const REPLY_LIMITS = { min: 2, max: 5000 };

export function useReplyComposer() {
  const { ticket, actions } = useAdminTicketContext();
  const [text, setText] = useState(ticket.aiDraft ?? '');
  const [draftAt, setDraftAt] = useState(ticket.aiDraftAt);
  const [edited, setEdited] = useState(false);
  const [sent, setSent] = useState(false);

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
      setEdited(true);
      setSent(true);
    }
  };

  const fromDraft = !edited && Boolean(ticket.aiDraft) && text === ticket.aiDraft;

  return { text, fromDraft, sent, change, regenerate, submit };
}
