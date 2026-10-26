'use client';

import { useCallback, useMemo, useState } from 'react';
import { getErrorMessage } from '@/lib/api/api-error';
import { appendMessage, appendNote } from '@/lib/ticket-updates';
import * as adminService from '@/services/admin.service';
import {
  AdminTicketDetail,
  TicketAction,
  TicketActionError,
  TicketActions,
} from '@/types/admin-ticket.types';

type SetTicket = (update: (current: AdminTicketDetail) => AdminTicketDetail) => void;

export function useTicketActions(ticketId: string, setTicket: SetTicket): TicketActions {
  const [pending, setPending] = useState<TicketAction | null>(null);
  const [error, setError] = useState<TicketActionError | null>(null);

  const run = useCallback(
    async <T>(action: TicketAction, task: () => Promise<T>, apply: (result: T) => void) => {
      setPending(action);
      setError(null);
      try {
        apply(await task());
        return true;
      } catch (caught) {
        setError({ action, message: getErrorMessage(caught) });
        return false;
      } finally {
        setPending(null);
      }
    },
    [],
  );

  return useMemo<TicketActions>(
    () => ({
      pending,
      error,
      update: (input) =>
        run(
          'update',
          () => adminService.updateTicket(ticketId, input),
          (ticket) => setTicket(() => ticket),
        ),
      assignToMe: () =>
        run(
          'assign',
          () => adminService.assignToMe(ticketId),
          (ticket) => setTicket(() => ticket),
        ),
      reply: (body) =>
        run(
          'reply',
          () => adminService.sendReply(ticketId, body),
          (message) => setTicket((ticket) => appendMessage(ticket, message)),
        ),
      addNote: (body) =>
        run(
          'note',
          () => adminService.addNote(ticketId, body),
          (note) => setTicket((ticket) => appendNote(ticket, note)),
        ),
      regenerateDraft: () =>
        run(
          'draft',
          () => adminService.generateDraft(ticketId),
          (draft) =>
            setTicket((ticket) => ({
              ...ticket,
              aiDraft: draft.aiDraft,
              aiDraftAt: draft.aiDraftAt,
            })),
        ),
    }),
    [pending, error, run, ticketId, setTicket],
  );
}
