import { TicketCategory, TicketStatus } from '@/types/ticket.types';
import { Tone } from '@/types/ui.types';

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

export const isPublished = (status: string): boolean => status.toLowerCase().includes('published');
