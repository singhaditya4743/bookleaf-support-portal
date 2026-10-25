'use client';

import { useSyncExternalStore } from 'react';

const MINUTE = 60000;

const subscribe = (onChange: () => void) => {
  const id = setInterval(onChange, MINUTE);
  return () => clearInterval(id);
};

const getSnapshot = () => Math.floor(Date.now() / MINUTE);
const getServerSnapshot = () => null;

export function useCurrentMinute(): number | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
