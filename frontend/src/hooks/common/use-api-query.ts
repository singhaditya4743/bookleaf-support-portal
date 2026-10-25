'use client';

import { useCallback, useEffect, useState } from 'react';
import { toQueryError } from '@/lib/api/api-error';
import { apiRequest } from '@/lib/api/client';
import { QueryError, QueryResult } from '@/types/api.types';

interface Snapshot<T> {
  key: string;
  path: string | null;
  data: T | null;
  error: QueryError | null;
}

export function useApiQuery<T>(path: string | null): QueryResult<T> {
  const [version, setVersion] = useState(0);
  const [snapshot, setSnapshot] = useState<Snapshot<T>>({
    key: '',
    path: null,
    data: null,
    error: null,
  });
  const key = `${path}#${version}`;

  useEffect(() => {
    if (!path) return;
    const controller = new AbortController();
    apiRequest<T>(path, { signal: controller.signal })
      .then((data) => setSnapshot({ key, path, data, error: null }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        setSnapshot((current) => ({
          key,
          path,
          data: current.path === path ? current.data : null,
          error: toQueryError(error),
        }));
      });
    return () => controller.abort();
  }, [path, key]);

  const reload = useCallback(() => setVersion((value) => value + 1), []);

  const setData = useCallback((update: (current: T) => T) => {
    setSnapshot((current) =>
      current.data === null ? current : { ...current, data: update(current.data) },
    );
  }, []);

  const isCurrent = snapshot.path === path;

  return {
    data: isCurrent ? snapshot.data : null,
    error: isCurrent ? snapshot.error : null,
    loading: path !== null && snapshot.key !== key,
    reload,
    setData,
  };
}
