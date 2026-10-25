import { LucideIcon } from 'lucide-react';

export type Panel = 'author' | 'admin';

export type Tone = 'neutral' | 'brand' | 'blue' | 'amber' | 'green' | 'red' | 'violet';

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface SelectOption {
  value: string;
  label: string;
}

export type FieldErrors<T> = Partial<Record<keyof T, string>>;
