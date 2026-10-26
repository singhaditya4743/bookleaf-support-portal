import { Injectable, NotFoundException } from '@nestjs/common';
import { TicketStatus } from '@prisma/client';
import { CreateReplyDto } from '@/common/dto/create-reply.dto';
import { TICKET_MESSAGE_SELECT, toMessageView } from '@/common/mappers/ticket-message.mapper';
import { SocketService } from '@/modules/socket/socket.service';
import { TICKET_UPDATE_SELECT, toTicketUpdate } from '@/modules/socket/ticket-update.mapper';
import { PrismaService } from '@/prisma/prisma.service';
import { TicketMessageView } from '@/types/ticket.types';

const CLOSED_STATUSES: TicketStatus[] = [TicketStatus.RESOLVED, TicketStatus.CLOSED];

@Injectable()
export class TicketRepliesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly socket: SocketService,
  ) {}

  async create(
    authorId: string,
    ticketId: string,
    dto: CreateReplyDto,
  ): Promise<TicketMessageView> {
    const ticket = await this.prisma.ticket.findFirst({
      where: { id: ticketId, authorId },
      select: { status: true },
    });
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    const reopen = CLOSED_STATUSES.includes(ticket.status);
    const [row, updated] = await this.prisma.$transaction([
      this.prisma.ticketMessage.create({
        data: { ticketId, senderId: authorId, body: dto.body },
        select: TICKET_MESSAGE_SELECT,
      }),
      this.prisma.ticket.update({
        where: { id: ticketId },
        data: {
          aiDraft: null,
          aiDraftAt: null,
          ...(reopen ? { status: TicketStatus.OPEN, resolvedAt: null } : {}),
        },
        select: TICKET_UPDATE_SELECT,
      }),
    ]);

    const message = toMessageView(row);
    this.socket.replyAdded(authorId, { ticketId, message });
    this.socket.ticketUpdated(authorId, toTicketUpdate(updated));
    return message;
  }
}
