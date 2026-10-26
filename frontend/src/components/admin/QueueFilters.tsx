'use client';

import { X } from 'lucide-react';
import { memo } from 'react';
import { QueueFilterFields } from '@/components/admin/QueueFilterFields';
import { Button } from '@/components/ui/Button';
import { DebouncedSearchInput } from '@/components/ui/DebouncedSearchInput';
import { Select } from '@/components/ui/inputs';
import { SORT_OPTIONS } from '@/lib/filter-options';
import { TicketFilters, TicketSort } from '@/types/admin-ticket.types';

interface QueueFiltersProps {
  filters: TicketFilters;
  isFiltered: boolean;
  onChange: (patch: Partial<TicketFilters>) => void;
  onReset: () => void;
}

export const QueueFilters = memo(function QueueFilters({
  filters,
  isFiltered,
  onChange,
  onReset,
}: QueueFiltersProps) {
  return (
    <div className="space-y-3 border-b border-slate-200 px-4 py-4">
      <div className="flex flex-col gap-3 lg:flex-row">
        <div className="flex-1">
          <DebouncedSearchInput
            value={filters.search}
            placeholder="Search by subject, author name or email"
            onChange={(search) => onChange({ search })}
          />
        </div>
        <Select
          aria-label="Sort tickets"
          className="lg:w-52"
          options={SORT_OPTIONS}
          value={filters.sort}
          onChange={(event) => onChange({ sort: event.target.value as TicketSort })}
        />
      </div>
      <QueueFilterFields filters={filters} onChange={onChange} />
      {isFiltered && (
        <Button variant="ghost" size="sm" onClick={onReset}>
          <X className="size-4" aria-hidden />
          Clear filters
        </Button>
      )}
    </div>
  );
});
