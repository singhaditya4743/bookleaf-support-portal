'use client';

import { Paperclip, X } from 'lucide-react';
import { ChangeEvent, useRef } from 'react';

interface AttachmentInputProps {
  id: string;
  fileName: string | undefined;
  onChange: (fileName: string | undefined) => void;
}

export function AttachmentInput({ id, fileName, onChange }: AttachmentInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const onSelect = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.files?.[0]?.name);
  };

  const clear = () => {
    onChange(undefined);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="flex items-center gap-3 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-3">
      <Paperclip className="size-4 shrink-0 text-slate-400" aria-hidden />
      {fileName ? (
        <>
          <span className="min-w-0 flex-1 truncate text-sm text-slate-700">{fileName}</span>
          <button
            type="button"
            onClick={clear}
            aria-label="Remove attachment"
            className="rounded p-1 text-slate-500 hover:bg-slate-200"
          >
            <X className="size-4" />
          </button>
        </>
      ) : (
        <label htmlFor={id} className="flex-1 cursor-pointer text-sm text-slate-500">
          <span className="font-medium text-brand-700 hover:underline">Choose a file</span> —
          screenshot, PDF or photo (max 5 MB)
        </label>
      )}
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept="image/*,.pdf"
        className="sr-only"
        onChange={onSelect}
      />
    </div>
  );
}
