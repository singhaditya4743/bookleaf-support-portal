'use client';

import { X } from 'lucide-react';
import { memo } from 'react';
import { Button } from '@/components/ui/Button';
import { DebouncedSearchInput } from '@/components/ui/DebouncedSearchInput';
import { Input, Select } from '@/components/ui/inputs';
import {
  CATEGORY_FILTER_OPTIONS,
  PRIORITY_FILTER_OPTIONS,
  SORT_OPTIONS,
  STATUS_FILTER_OPTIONS,
} from '@/lib/filter-options';
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
      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <Select
          aria-label="Filter by status"
          options={STATUS_FILTER_OPTIONS}
          value={filters.status}
          onChange={(event) => onChange({ status: event.target.value as TicketFilters['status'] })}
        />
        <Select
          aria-label="Filter by category"
          options={CATEGORY_FILTER_OPTIONS}
          value={filters.category}
          onChange={(event) =>
            onChange({ category: event.target.value as TicketFilters['category'] })
          }
        />
        <Select
          aria-label="Filter by priority"
          options={PRIORITY_FILTER_OPTIONS}
          value={filters.priority}
          onChange={(event) =>
            onChange({ priority: event.target.value as TicketFilters['priority'] })
          }
        />
        <Input
          type="date"
          aria-label="Created from"
          title="Created from"
          value={filters.from}
          max={filters.to || undefined}
          onChange={(event) => onChange({ from: event.target.value })}
        />
        <Input
          type="date"
          aria-label="Created to"
          title="Created to"
          value={filters.to}
          min={filters.from || undefined}
          onChange={(event) => onChange({ to: event.target.value })}
        />
      </div>
      {isFiltered && (
        <Button variant="ghost" size="sm" onClick={onReset}>
          <X className="size-4" aria-hidden />
          Clear filters
        </Button>
      )}
    </div>
  );
});
