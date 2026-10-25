import { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';
import { SelectOption } from '@/types/ui.types';

const field = (invalid?: boolean) =>
  cn(
    'w-full rounded-lg border bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2',
    invalid
      ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
      : 'border-slate-300 focus:border-brand-500 focus:ring-brand-100',
  );

interface InvalidProps {
  invalid?: boolean;
}

export function Input({
  invalid,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & InvalidProps) {
  return (
    <input aria-invalid={invalid} className={cn(field(invalid), 'h-10', className)} {...props} />
  );
}

export function Textarea({
  invalid,
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & InvalidProps) {
  return (
    <textarea
      aria-invalid={invalid}
      className={cn(field(invalid), 'py-2.5', className)}
      {...props}
    />
  );
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>, InvalidProps {
  options: SelectOption[];
}

export function Select({ invalid, options, className, ...props }: SelectProps) {
  return (
    <select aria-invalid={invalid} className={cn(field(invalid), 'h-10', className)} {...props}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
