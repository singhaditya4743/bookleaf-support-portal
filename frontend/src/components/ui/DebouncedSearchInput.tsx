'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { SearchInput } from '@/components/ui/SearchInput';

interface DebouncedSearchInputProps {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  delay?: number;
}

export function DebouncedSearchInput({
  value,
  placeholder,
  onChange,
  delay = 300,
}: DebouncedSearchInputProps) {
  const [text, setText] = useState(value);
  const [synced, setSynced] = useState(value);
  const [committed, setCommitted] = useState(value);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  if (value !== synced) {
    setSynced(value);
    if (value !== committed) setText(value);
  }

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleChange = useCallback(
    (next: string) => {
      setText(next);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        setCommitted(next);
        onChange(next);
      }, delay);
    },
    [onChange, delay],
  );

  return <SearchInput value={text} placeholder={placeholder} onChange={handleChange} />;
}
