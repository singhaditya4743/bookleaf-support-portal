'use client';

import { Paperclip, X } from 'lucide-react';
import { ChangeEvent, useRef, useState } from 'react';

const MAX_SIZE_MB = 5;
const MAX_BYTES = MAX_SIZE_MB * 1024 * 1024;

const isAllowedType = (file: File) =>
  file.type.startsWith('image/') || file.type === 'application/pdf';

interface AttachmentInputProps {
  id: string;
  fileName: string | undefined;
  onChange: (fileName: string | undefined) => void;
}

export function AttachmentInput({ id, fileName, onChange }: AttachmentInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const clear = () => {
    onChange(undefined);
    if (inputRef.current) inputRef.current.value = '';
  };

  const onSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const problem = !isAllowedType(file)
      ? 'Only images and PDF files are allowed.'
      : file.size > MAX_BYTES
        ? `This file is larger than ${MAX_SIZE_MB} MB. Please choose a smaller file.`
        : null;
    setError(problem);
    if (problem) return clear();
    onChange(file.name);
  };

  return (
    <div className="space-y-1.5">
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
            screenshot, PDF or photo (max {MAX_SIZE_MB} MB)
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
      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
