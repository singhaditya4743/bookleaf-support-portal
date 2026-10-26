'use client';

import { useEffect, useRef } from 'react';
import { useAdminTicketContext } from '@/hooks/admin/use-admin-ticket-context';

const BACKGROUND_DRAFT_GRACE_MS = 20000;

export function useAutoDraft(): void {
  const { ticket, actions } = useAdminTicketContext();
  const attempted = useRef(false);
  const missing = !ticket.aiDraft;
  const { regenerateDraft } = actions;

  useEffect(() => {
    if (!missing) {
      attempted.current = false;
      return;
    }
    if (attempted.current) return;
    const readyBy = new Date(ticket.createdAt).getTime() + BACKGROUND_DRAFT_GRACE_MS;
    const timer = setTimeout(
      () => {
        attempted.current = true;
        void regenerateDraft();
      },
      Math.max(0, readyBy - Date.now()),
    );
    return () => clearTimeout(timer);
  }, [missing, ticket.createdAt, regenerateDraft]);
}
