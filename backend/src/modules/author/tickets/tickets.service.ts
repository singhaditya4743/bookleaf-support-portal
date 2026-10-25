import { Injectable, NotFoundException } from '@nestjs/common';
import { TicketTriageService } from '@/modules/ai/ticket-triage.service';
import { SocketService } from '@/modules/socket/socket.service';
import { CreateTicketDto } from '@/modules/author/tickets/dto/create-ticket.dto';
import {
  TICKET_DETAIL_SELECT,
  TICKET_SUMMARY_SELECT,
  toTicketDetail,
  toTicketSummary,
} from '@/modules/author/tickets/tickets.mapper';
import { PrismaService } from '@/prisma/prisma.service';
import { AuthorTicketDetail, AuthorTicketSummary } from '@/types/ticket.types';

@Injectable()
export class TicketsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly triage: TicketTriageService,
    private readonly socket: SocketService,
  ) {}

  async create(authorId: string, dto: CreateTicketDto): Promise<AuthorTicketDetail> {
    if (dto.bookId) {
      await this.assertOwnsBook(authorId, dto.bookId);
    }

    const ticket = await this.prisma.ticket.create({
      data: { ...dto, authorId },
      select: TICKET_DETAIL_SELECT,
    });
    this.socket.ticketCreated({
      ticketId: ticket.id,
      subject: ticket.subject,
      createdAt: ticket.createdAt,
    });
    this.triage.triageInBackground(ticket.id);
    return toTicketDetail(ticket);
  }

  async findAll(authorId: string): Promise<AuthorTicketSummary[]> {
    const tickets = await this.prisma.ticket.findMany({
      where: { authorId },
      orderBy: { updatedAt: 'desc' },
      select: TICKET_SUMMARY_SELECT,
    });
    return tickets.map(toTicketSummary);
  }

  async findOne(authorId: string, ticketId: string): Promise<AuthorTicketDetail> {
    const ticket = await this.prisma.ticket.findFirst({
      where: { id: ticketId, authorId },
      select: TICKET_DETAIL_SELECT,
    });
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }
    return toTicketDetail(ticket);
  }

  private async assertOwnsBook(authorId: string, bookId: string): Promise<void> {
    const book = await this.prisma.book.findFirst({
      where: { id: bookId, authorId },
      select: { id: true },
    });
    if (!book) {
      throw new NotFoundException('Book not found in your catalogue');
    }
  }
}
