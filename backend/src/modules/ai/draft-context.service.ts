import { Injectable, NotFoundException } from '@nestjs/common';
import { Book, TicketCategory } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';
import { DraftBookFacts, DraftContext } from '@/types/ai-draft.types';

const formatDate = (date: Date | null): string =>
  date?.toISOString().slice(0, 10) ?? 'not available';
const rupees = (value: { toNumber(): number } | null): string =>
  value ? `Rs ${value.toNumber().toLocaleString('en-IN')}` : 'not set';

function toBookFacts(book: Book): DraftBookFacts {
  return {
    title: book.title,
    isbn: book.isbn ?? 'not assigned',
    status: book.status,
    publicationDate: formatDate(book.publicationDate),
    mrp: rupees(book.mrp),
    copiesSold: book.copiesSold,
    royaltyEarned: rupees(book.royaltyEarned),
    royaltyPaid: rupees(book.royaltyPaid),
    royaltyPending: rupees(book.royaltyEarned.minus(book.royaltyPaid)),
    lastPayoutDate: formatDate(book.lastPayoutAt),
    printPartner: book.printPartner ?? 'not assigned',
    availableOn: book.availableOn.join(', ') || 'not listed yet',
  };
}

@Injectable()
export class DraftContextService {
  constructor(private readonly prisma: PrismaService) {}

  async build(ticketId: string): Promise<{ category: TicketCategory; context: DraftContext }> {
    const ticket = await this.prisma.ticket.findUnique({
      where: { id: ticketId },
      include: {
        author: { select: { name: true } },
        book: true,
        messages: { orderBy: { createdAt: 'asc' }, select: { body: true } },
      },
    });
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    return {
      category: ticket.category,
      context: {
        today: new Date().toISOString().slice(0, 10),
        authorName: ticket.author.name,
        subject: ticket.subject,
        description: ticket.description,
        book: ticket.book ? toBookFacts(ticket.book) : null,
        previousReplies: ticket.messages.map((message) => message.body),
      },
    };
  }
}
