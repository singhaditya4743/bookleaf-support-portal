import { CheckCircle2 } from 'lucide-react';

export function SuccessNote({ message }: { message: string | null }) {
  if (!message) return null;

  return (
    <p
      role="status"
      className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3.5 py-2.5 text-sm font-medium text-emerald-700 ring-1 ring-emerald-100"
    >
      <CheckCircle2 className="size-4 shrink-0" aria-hidden />
      {message}
    </p>
  );
}
