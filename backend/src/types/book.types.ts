export interface AuthorBook {
  id: string;
  bookCode: string;
  title: string;
  isbn: string | null;
  genre: string | null;
  publicationDate: Date | null;
  status: string;
  mrp: number | null;
  royaltyPerCopy: number | null;
  copiesSold: number;
  royaltyEarned: number;
  royaltyPaid: number;
  royaltyPending: number;
  lastPayoutAt: Date | null;
  availableOn: string[];
}
