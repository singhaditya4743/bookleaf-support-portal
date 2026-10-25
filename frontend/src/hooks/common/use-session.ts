'use client';

import { useSyncExternalStore } from 'react';
import { sessionStore } from '@/lib/auth/session-store';
import { Session } from '@/types/auth.types';

const getServerSnapshot = (): undefined => undefined;

export function useSession(): Session | null | undefined {
  return useSyncExternalStore(sessionStore.subscribe, sessionStore.get, getServerSnapshot);
}
