import { AiProvider, TicketPriority, TicketSort } from '@/types/admin-ticket.types';
import { TicketCategory, TicketStatus } from '@/types/ticket.types';
import { SelectOption, Tone } from '@/types/ui.types';

export const STATUS_LABELS: Record<TicketStatus, string> = {
  OPEN: 'Open',
  IN_PROGRESS: 'In Progress',
  RESOLVED: 'Resolved',
  CLOSED: 'Closed',
};

export const STATUS_TONES: Record<TicketStatus, Tone> = {
  OPEN: 'blue',
  IN_PROGRESS: 'amber',
  RESOLVED: 'green',
  CLOSED: 'neutral',
};

export const CATEGORY_LABELS: Record<TicketCategory, string> = {
  ROYALTY_PAYMENTS: 'Royalty & Payments',
  ISBN_METADATA: 'ISBN & Metadata',
  PRINTING_QUALITY: 'Printing & Quality',
  DISTRIBUTION_AVAILABILITY: 'Distribution & Availability',
  BOOK_STATUS_PRODUCTION: 'Book Status & Production',
  GENERAL_INQUIRY: 'General Inquiry',
};

export const PRIORITY_LABELS: Record<TicketPriority, string> = {
  CRITICAL: 'Critical',
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low',
};

export const PRIORITY_TONES: Record<TicketPriority, Tone> = {
  CRITICAL: 'red',
  HIGH: 'amber',
  MEDIUM: 'blue',
  LOW: 'neutral',
};

export const PROVIDER_LABELS: Record<AiProvider, string> = {
  GROQ: 'Groq AI',
  GEMINI: 'Gemini AI',
  KEYWORD_FALLBACK: 'Keyword rules',
};

export const SORT_LABELS: Record<TicketSort, string> = {
  urgency: 'Most urgent first',
  oldest: 'Oldest first',
  newest: 'Newest first',
};

export const toOptions = (labels: Record<string, string>): SelectOption[] =>
  Object.entries(labels).map(([value, label]) => ({ value, label }));

export const isPublished = (status: string): boolean => status.toLowerCase().includes('published');
