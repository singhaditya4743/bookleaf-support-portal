'use client';

import { FormEvent, useState } from 'react';
import { useUnsavedWarning } from '@/hooks/common/use-unsaved-warning';
import { getErrorMessage } from '@/lib/api/api-error';
import { REPLY_LIMITS } from '@/lib/validation';
import { replyToTicket } from '@/services/author.service';
import { TicketMessage } from '@/types/ticket.types';

export function useAuthorReply(ticketId: string, onSent: (message: TicketMessage) => void) {
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useUnsavedWarning(text.trim().length > 0);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = text.trim();
    if (body.length < REPLY_LIMITS.min || sending) return;
    setSending(true);
    setError(null);
    try {
      onSent(await replyToTicket(ticketId, body));
      setText('');
    } catch (caught) {
      setError(getErrorMessage(caught));
    } finally {
      setSending(false);
    }
  };

  return { text, setText, sending, error, submit };
}
