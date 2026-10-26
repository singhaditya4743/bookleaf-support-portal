import { ReactNode } from 'react';
import { Input, Select } from '@/components/ui/inputs';
import {
  CATEGORY_FILTER_OPTIONS,
  PRIORITY_FILTER_OPTIONS,
  STATUS_FILTER_OPTIONS,
} from '@/lib/filter-options';
import { TicketFilters } from '@/types/admin-ticket.types';

function FilterField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block space-y-1">
      <span className="text-xs font-medium text-slate-500">{label}</span>
      {children}
    </label>
  );
}

interface QueueFilterFieldsProps {
  filters: TicketFilters;
  onChange: (patch: Partial<TicketFilters>) => void;
}

export function QueueFilterFields({ filters, onChange }: QueueFilterFieldsProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
      <FilterField label="Status">
        <Select
          aria-label="Filter by status"
          options={STATUS_FILTER_OPTIONS}
          value={filters.status}
          onChange={(event) => onChange({ status: event.target.value as TicketFilters['status'] })}
        />
      </FilterField>
      <FilterField label="Category">
        <Select
          aria-label="Filter by category"
          options={CATEGORY_FILTER_OPTIONS}
          value={filters.category}
          onChange={(event) =>
            onChange({ category: event.target.value as TicketFilters['category'] })
          }
        />
      </FilterField>
      <FilterField label="Priority">
        <Select
          aria-label="Filter by priority"
          options={PRIORITY_FILTER_OPTIONS}
          value={filters.priority}
          onChange={(event) =>
            onChange({ priority: event.target.value as TicketFilters['priority'] })
          }
        />
      </FilterField>
      <FilterField label="Created from">
        <Input
          type="date"
          aria-label="Created from"
          value={filters.from}
          max={filters.to || undefined}
          onChange={(event) => onChange({ from: event.target.value })}
        />
      </FilterField>
      <FilterField label="Created to">
        <Input
          type="date"
          aria-label="Created to"
          value={filters.to}
          min={filters.from || undefined}
          onChange={(event) => onChange({ to: event.target.value })}
        />
      </FilterField>
    </div>
  );
}
