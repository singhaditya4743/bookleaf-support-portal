'use client';

import { useEffect, useId } from 'react';
import { Button } from '@/components/ui/Button';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4"
      onClick={onCancel}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id={titleId} className="text-base font-semibold text-slate-900">
          {title}
        </h2>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={onCancel} autoFocus>
            Cancel
          </Button>
          <Button onClick={onConfirm}>{confirmLabel}</Button>
        </div>
      </div>
    </div>
  );
}
