export interface AuthorBook {
  id: string;
  bookCode: string;
  title: string;
  isbn: string | null;
  genre: string | null;
  publicationDate: string | null;
  status: string;
  mrp: number | null;
  royaltyPerCopy: number | null;
  copiesSold: number;
  royaltyEarned: number;
  royaltyPaid: number;
  royaltyPending: number;
  lastPayoutAt: string | null;
  printPartner: string | null;
  availableOn: string[];
}

export interface BookStatsSummary {
  totalBooks: number;
  copiesSold: number;
  royaltyEarned: number;
  royaltyPending: number;
}
