import { Leaf } from 'lucide-react';

export function Logo() {
  return (
    <span className="flex items-center gap-2 text-base font-semibold text-slate-900">
      <span className="flex size-8 items-center justify-center rounded-lg bg-brand-600 text-white">
        <Leaf className="size-4" aria-hidden />
      </span>
      BookLeaf
      <span className="text-sm font-normal text-slate-500">Support</span>
    </span>
  );
}
