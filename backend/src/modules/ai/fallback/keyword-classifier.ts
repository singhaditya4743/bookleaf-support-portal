import { AiProvider, TicketCategory, TicketPriority } from '@prisma/client';
import { Classification, TicketClassificationInput } from '@/types/ai.types';

const CATEGORY_KEYWORDS: [TicketCategory, RegExp][] = [
  [TicketCategory.ROYALTY_PAYMENTS, /royalt|payout|payment|paid|bank|earning|money|amount/],
  [TicketCategory.ISBN_METADATA, /isbn|metadata|wrong title|author name|imprint/],
  [
    TicketCategory.PRINTING_QUALITY,
    /print|binding|blurry|misalign|cover quality|defect|author copies/,
  ],
  [
    TicketCategory.DISTRIBUTION_AVAILABILITY,
    /amazon|flipkart|unavailable|listing|out of stock|store/,
  ],
  [
    TicketCategory.BOOK_STATUS_PRODUCTION,
    /typeset|proofread|cover design|editing|production|status|when will/,
  ],
];

const CRITICAL = /legal|lawyer|fraud|months|scam|duplicate isbn|wrong book|urgent/;
const HIGH = /isbn|defect|blurry|misalign|unavailable|not received|overdue|wrong/;
const LOW = /bio|update (my|the) description|how (do|can) i|can i|question/;

export function classifyByKeywords(input: TicketClassificationInput): Classification {
  const text = `${input.subject} ${input.description}`.toLowerCase();
  const match = CATEGORY_KEYWORDS.find(([, pattern]) => pattern.test(text));

  let priority: TicketPriority = TicketPriority.MEDIUM;
  if (CRITICAL.test(text)) {
    priority = TicketPriority.CRITICAL;
  } else if (HIGH.test(text)) {
    priority = TicketPriority.HIGH;
  } else if (LOW.test(text)) {
    priority = TicketPriority.LOW;
  }

  return {
    category: match ? match[0] : TicketCategory.GENERAL_INQUIRY,
    priority,
    provider: AiProvider.KEYWORD_FALLBACK,
  };
}
