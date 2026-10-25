import { ReactNode } from 'react';

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  hint?: ReactNode;
  optional?: boolean;
  children: ReactNode;
}

export function FormField({ id, label, error, hint, optional, children }: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
        {label}
        {optional && <span className="font-normal text-slate-400">(optional)</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-sm text-red-600">
          {error}
        </p>
      ) : (
        hint && <div className="text-xs text-slate-500">{hint}</div>
      )}
    </div>
  );
}
