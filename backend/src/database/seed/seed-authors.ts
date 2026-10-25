import { readFileSync } from 'node:fs';
import { Prisma, PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcryptjs';
import {
  AUTHOR_DEFAULT_PASSWORD,
  BCRYPT_ROUNDS,
  SAMPLE_DATA_PATH,
} from '@/database/seed/seed.constants';
import { SampleAuthor, SampleBook, SampleData } from '@/types/seed.types';

function toDate(value: string | null): Date | null {
  return value ? new Date(value) : null;
}

function toBookData(book: SampleBook): Omit<Prisma.BookUncheckedCreateInput, 'authorId'> {
  return {
    bookCode: book.book_id,
    title: book.title,
    isbn: book.isbn,
    genre: book.genre,
    publicationDate: toDate(book.publication_date),
    status: book.status,
    mrp: book.mrp,
    royaltyPerCopy: book.author_royalty_per_copy,
    copiesSold: book.total_copies_sold,
    royaltyEarned: book.total_royalty_earned,
    royaltyPaid: book.royalty_paid,
    lastPayoutAt: toDate(book.last_royalty_payout_date),
    printPartner: book.print_partner,
    availableOn: book.available_on,
  };
}

async function seedAuthor(
  prisma: PrismaClient,
  author: SampleAuthor,
  passwordHash: string,
): Promise<number> {
  const profile = {
    name: author.name,
    email: author.email,
    phone: author.phone,
    city: author.city,
    joinedAt: toDate(author.joined_date),
  };

  const user = await prisma.user.upsert({
    where: { authorCode: author.author_id },
    update: profile,
    create: { ...profile, authorCode: author.author_id, passwordHash, role: Role.AUTHOR },
  });

  for (const book of author.books) {
    const data = toBookData(book);
    await prisma.book.upsert({
      where: { bookCode: book.book_id },
      update: { ...data, authorId: user.id },
      create: { ...data, authorId: user.id },
    });
  }

  return author.books.length;
}

export async function seedAuthors(
  prisma: PrismaClient,
): Promise<{ authors: number; books: number }> {
  const data = JSON.parse(readFileSync(SAMPLE_DATA_PATH, 'utf-8')) as SampleData;
  const passwordHash = await hash(AUTHOR_DEFAULT_PASSWORD, BCRYPT_ROUNDS);

  let books = 0;
  for (const author of data.authors) {
    books += await seedAuthor(prisma, author, passwordHash);
  }

  return { authors: data.authors.length, books };
}
