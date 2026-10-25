import { AlertCircle } from 'lucide-react';

export function Alert({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="flex items-start gap-2 rounded-lg bg-red-50 px-3.5 py-3 text-sm text-red-700 ring-1 ring-red-100"
    >
      <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
      <span>{message}</span>
    </div>
  );
}
