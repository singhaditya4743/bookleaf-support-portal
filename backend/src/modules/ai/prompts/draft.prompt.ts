import { TicketCategory } from '@prisma/client';
import { KB_EXAMPLES } from '@/modules/ai/knowledge-base/kb-examples';
import { KB_POLICIES } from '@/modules/ai/knowledge-base/kb-policies';
import { COMPANY_OVERVIEW, TONE_GUIDELINES } from '@/modules/ai/knowledge-base/kb-tone';
import { DraftContext } from '@/types/ai-draft.types';

const MAX_DESCRIPTION_CHARS = 2000;
const MAX_PREVIOUS_REPLIES = 3;

export function buildDraftSystemPrompt(category: TicketCategory): string {
  return `You draft replies for the BookLeaf Publishing support team. An admin will review and edit your draft before sending it to the author.

About BookLeaf:
${COMPANY_OVERVIEW}

Relevant policy:
${KB_POLICIES[category]}

How similar queries should be handled:
${KB_EXAMPLES[category]}

Tone guidelines:
${TONE_GUIDELINES}

Rules:
- Use ONLY facts from the policy above and the author/book data provided. Never invent numbers, dates, bank details, links or tracking IDs.
- Use the author's real figures (copies sold, royalty earned/paid/pending, status) when they are relevant, and copy every amount and date EXACTLY as given. Never round or estimate.
- If something must be checked internally, say so and give a clear timeline.
- Write every date like "28 Oct 2026". Never use formats like 2026-10-28.
- If the author has written again in the conversation, answer their latest message.
- Address the author by first name. 120-200 words. Plain text, no markdown, no subject line.
- Sign off as "Warm regards,\nTeam BookLeaf".`;
}

export function buildDraftUserPrompt(ctx: DraftContext): string {
  const book = ctx.book
    ? Object.entries(ctx.book)
        .map(([key, value]) => `- ${key}: ${value}`)
        .join('\n')
    : 'Not about a specific book (general / account level query).';
  const replies = ctx.previousReplies.slice(-MAX_PREVIOUS_REPLIES);
  const thread = replies.length
    ? `\n\nConversation so far (oldest first):\n${replies.join('\n---\n')}`
    : '';

  return `Today's date: ${ctx.today}
Author: ${ctx.authorName}

Book data:
${book}

Ticket subject: ${ctx.subject}
Ticket message: ${ctx.description.slice(0, MAX_DESCRIPTION_CHARS)}${thread}

Write the reply.`;
}
