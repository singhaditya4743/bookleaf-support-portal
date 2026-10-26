'use client';

import { useEffect, useState } from 'react';

export function useFlashMessage(durationMs = 3000) {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(null), durationMs);
    return () => clearTimeout(timer);
  }, [message, durationMs]);

  return [message, setMessage] as const;
}
