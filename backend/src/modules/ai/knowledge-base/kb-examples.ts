import { TicketCategory } from '@prisma/client';

export const KB_EXAMPLES: Record<TicketCategory, string> = {
  [TicketCategory.ROYALTY_PAYMENTS]: `Query: "I published my book 4 months ago and still haven't received any royalty."
Approach: acknowledge the frustration, explain the quarterly cycle and 45-day payout window, check that bank details are linked, give the specific next payout date; if genuinely overdue, escalate with a 48-hour resolution timeline.
Query: "My royalty seems too low. I sold 200 copies but only received Rs 3,000."
Approach: explain net profit (MRP minus printing, platform commission, shipping), offer a line-by-line breakdown, be transparent, not defensive.`,

  [TicketCategory.ISBN_METADATA]: `Query: "My book shows a different ISBN on Amazon than on the physical copy."
Approach: treat as high priority, acknowledge it is a serious data issue, confirm escalation to the production team immediately, give a 48-hour resolution timeline.`,

  [TicketCategory.PRINTING_QUALITY]: `Query: "My author copies have blurry images and misaligned pages."
Approach: apologise sincerely, ask for photos of the defective copies, confirm a free reprint once verified, give a 5-7 business day reprint timeline.`,

  [TicketCategory.DISTRIBUTION_AVAILABILITY]: `Query: "My book is published but shows 'Currently Unavailable' on Amazon."
Approach: explain it is typically a stock sync issue, confirm a re-sync is being triggered, set the expectation of 24-48 hours.`,

  [TicketCategory.BOOK_STATUS_PRODUCTION]: `Query: "It's been 3 weeks and my book is still in typesetting."
Approach: state the actual production status, be honest about the reason for any delay, give a specific updated timeline, never blame the author; frame it collaboratively.`,

  [TicketCategory.GENERAL_INQUIRY]: `Query: "Can I update my book description on Amazon after it's live?"
Approach: yes, submit via the dashboard or email the team; changes reflect within 3-5 business days.`,
};
