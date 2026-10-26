import {
  CATEGORY_LABELS,
  PRIORITY_LABELS,
  SORT_LABELS,
  STATUS_LABELS,
  toOptions,
} from '@/lib/labels';

const withAll = (label: string, labels: Record<string, string>) => [
  { value: '', label },
  ...toOptions(labels),
];

export const STATUS_FILTER_OPTIONS = withAll('All statuses', STATUS_LABELS);
export const CATEGORY_FILTER_OPTIONS = withAll('All categories', CATEGORY_LABELS);
export const PRIORITY_FILTER_OPTIONS = withAll('All priorities', PRIORITY_LABELS);
export const SORT_OPTIONS = toOptions(SORT_LABELS);
