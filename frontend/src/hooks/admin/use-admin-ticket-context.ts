'use client';

import { useContext } from 'react';
import { AdminTicketContext } from '@/context/admin-ticket.context';
import { AdminTicketContextValue } from '@/types/admin-ticket.types';

export function useAdminTicketContext(): AdminTicketContextValue {
  const value = useContext(AdminTicketContext);
  if (!value) throw new Error('useAdminTicketContext must be used inside AdminTicketProvider');
  return value;
}
