export type DraftBookFacts = Record<string, string | number>;

export interface DraftContext {
  today: string;
  authorName: string;
  subject: string;
  description: string;
  book: DraftBookFacts | null;
  previousReplies: string[];
}
