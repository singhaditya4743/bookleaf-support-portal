import { TicketCategory } from '@prisma/client';

export const KB_POLICIES: Record<TicketCategory, string> = {
  [TicketCategory.ROYALTY_PAYMENTS]: `Royalty Policy:
- 80/20 split: 80% of net profit per book goes to the author, 20% to BookLeaf.
- Net profit = MRP minus printing cost, platform commission (Amazon/Flipkart) and shipping charges.
- Royalties are calculated quarterly and paid within 45 days of the quarter ending.
- Minimum payout threshold is Rs 1,000. Smaller amounts roll over to the next quarter.
- Payouts are made by bank transfer to the account linked in the author's dashboard.
- Authors can see a per-platform royalty breakdown in their dashboard.`,

  [TicketCategory.ISBN_METADATA]: `ISBN Policy:
- Every book gets a unique ISBN assigned by BookLeaf, registered under BookLeaf's publisher imprint.
- Authors who want an ISBN under their own imprint must obtain it independently.
- ISBN errors (duplicate, wrong book linked) are high priority and escalated to the production team.
- Metadata updates (description etc.) can be submitted via the dashboard or by email and reflect on platforms within 3-5 business days.`,

  [TicketCategory.PRINTING_QUALITY]: `Printing & Quality:
- In-house printing handles most orders; overflow or special formats go to Repro India or Epitome Books.
- Standard print turnaround: 5-7 business days from order confirmation.
- For quality issues (misprints, binding defects, colour inconsistency) BookLeaf arranges a free reprint after verification. The author may need to share photos of the defective copy.`,

  [TicketCategory.DISTRIBUTION_AVAILABILITY]: `Distribution & Availability:
- Books are listed on Amazon India, Flipkart, Amazon US, Amazon UK and the BookLeaf Store.
- New listings go live within 7-10 business days after publication is complete.
- "Unavailable" on a platform usually means a stock sync issue; the team can trigger a re-sync within 24-48 hours.`,

  [TicketCategory.BOOK_STATUS_PRODUCTION]: `Production Stages:
- Manuscript Received -> Editing (if opted) -> Cover Design -> Typesetting -> Proofreading -> ISBN Assignment -> Printing -> Distribution Setup -> Published & Live.
- Authors are emailed at each stage.
- Delays usually happen at Cover Design (waiting for author approval) and Proofreading (revision rounds).`,

  [TicketCategory.GENERAL_INQUIRY]: `General:
- Metadata updates (book description etc.) can be submitted via the dashboard or by emailing the BookLeaf team and reflect on platforms within 3-5 business days.
- For anything else, the support team responds with a clear next step and timeline.`,
};
