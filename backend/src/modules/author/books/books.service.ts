import { Injectable } from '@nestjs/common';
import { Book } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';
import { AuthorBook } from '@/types/book.types';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(authorId: string): Promise<AuthorBook[]> {
    const books = await this.prisma.book.findMany({
      where: { authorId },
      orderBy: { publicationDate: { sort: 'desc', nulls: 'first' } },
    });
    return books.map((book) => this.toAuthorBook(book));
  }

  private toAuthorBook(book: Book): AuthorBook {
    const royaltyEarned = book.royaltyEarned.toNumber();
    const royaltyPaid = book.royaltyPaid.toNumber();

    return {
      id: book.id,
      bookCode: book.bookCode,
      title: book.title,
      isbn: book.isbn,
      genre: book.genre,
      publicationDate: book.publicationDate,
      status: book.status,
      mrp: book.mrp?.toNumber() ?? null,
      royaltyPerCopy: book.royaltyPerCopy?.toNumber() ?? null,
      copiesSold: book.copiesSold,
      royaltyEarned,
      royaltyPaid,
      royaltyPending: royaltyEarned - royaltyPaid,
      lastPayoutAt: book.lastPayoutAt,
      availableOn: book.availableOn,
    };
  }
}
