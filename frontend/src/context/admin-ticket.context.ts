'use client';

import { createContext } from 'react';
import { AdminTicketContextValue } from '@/types/admin-ticket.types';

export const AdminTicketContext = createContext<AdminTicketContextValue | null>(null);
