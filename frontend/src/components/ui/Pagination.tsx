import { ChevronLeft, ChevronRight } from 'lucide-react';
import { memo } from 'react';
import { Button } from '@/components/ui/Button';

interface PaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onChange: (page: number) => void;
}

export const Pagination = memo(function Pagination({
  page,
  totalPages,
  totalItems,
  pageSize,
  onChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, totalItems);

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-between gap-3 border-t border-slate-100 px-5 py-3"
    >
      <p className="text-xs text-slate-500">
        Showing {from}–{to} of {totalItems}
      </p>
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onChange(page - 1)}
          disabled={page === 1}
          aria-label="Previous page"
        >
          <ChevronLeft className="size-4" aria-hidden />
        </Button>
        <span className="text-sm text-slate-600">
          {page} / {totalPages}
        </span>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onChange(page + 1)}
          disabled={page === totalPages}
          aria-label="Next page"
        >
          <ChevronRight className="size-4" aria-hidden />
        </Button>
      </div>
    </nav>
  );
});
