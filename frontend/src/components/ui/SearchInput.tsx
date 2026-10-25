import { Search, X } from 'lucide-react';
import { memo } from 'react';
import { Input } from '@/components/ui/inputs';

interface SearchInputProps {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

export const SearchInput = memo(function SearchInput({
  value,
  placeholder,
  onChange,
}: SearchInputProps) {
  return (
    <div className="relative">
      <Search
        className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400"
        aria-hidden
      />
      <Input
        type="search"
        value={value}
        placeholder={placeholder}
        aria-label={placeholder}
        className="pr-9 pl-9"
        onChange={(event) => onChange(event.target.value)}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute top-1/2 right-2 -translate-y-1/2 rounded p-1 text-slate-400 hover:text-slate-700"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
});
