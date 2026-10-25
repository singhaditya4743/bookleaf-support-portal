import { TicketCategory, TicketPriority } from '@prisma/client';
import { TicketClassificationInput } from '@/types/ai.types';

const MAX_DESCRIPTION_CHARS = 1500;

export const CLASSIFY_SYSTEM_PROMPT = `You triage author support tickets for BookLeaf Publishing, an Indian self-publishing company.
Return ONLY a JSON object: {"category": "<CATEGORY>", "priority": "<PRIORITY>"}

Categories:
- ${TicketCategory.ROYALTY_PAYMENTS}: royalty amounts, payouts, bank transfers, sales figures
- ${TicketCategory.ISBN_METADATA}: something is WRONG with the ISBN, title or author name (mismatch, duplicate, wrong book linked)
- ${TicketCategory.PRINTING_QUALITY}: print defects, binding, colour, author copies, print orders
- ${TicketCategory.DISTRIBUTION_AVAILABILITY}: book missing or unavailable on Amazon/Flipkart/store, listings
- ${TicketCategory.BOOK_STATUS_PRODUCTION}: progress of an unpublished book (cover, typesetting, proofreading)
- ${TicketCategory.GENERAL_INQUIRY}: requests to update a bio or book description, account questions, how-to questions, anything else

Priority:
- ${TicketPriority.CRITICAL}: money owed for a long time (e.g. no royalty for months), legal threats, author threatening to leave
- ${TicketPriority.HIGH}: ISBN errors, print quality defects, book unavailable on a store, payout overdue
- ${TicketPriority.MEDIUM}: production timeline questions, royalty calculation questions, delays without financial loss
- ${TicketPriority.LOW}: informational questions, bio or description updates, general how-to`;

export function buildClassifyUserPrompt(input: TicketClassificationInput): string {
  const description = input.description.slice(0, MAX_DESCRIPTION_CHARS);
  const book = input.bookStatus ? `\nBook status: ${input.bookStatus}` : '';
  return `Subject: ${input.subject}\nDescription: ${description}${book}`;
}
