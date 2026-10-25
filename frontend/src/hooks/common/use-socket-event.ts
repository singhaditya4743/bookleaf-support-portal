'use client';

import { useEffect, useRef } from 'react';
import { useSession } from '@/hooks/common/use-session';
import { connectSocket } from '@/lib/socket/socket-client';
import { ServerEventName, ServerEvents } from '@/types/socket.types';

export function useSocketEvent<E extends ServerEventName>(
  event: E,
  handler: (payload: ServerEvents[E]) => void,
): void {
  const token = useSession()?.accessToken;
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!token) return;
    const socket = connectSocket(token);
    const name: string = event;
    const listener = (payload: ServerEvents[E]) => handlerRef.current(payload);
    socket.on(name, listener);
    return () => {
      socket.off(name, listener);
    };
  }, [event, token]);
}
