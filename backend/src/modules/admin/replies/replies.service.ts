import { BadRequestException, Injectable } from '@nestjs/common';
import { TicketStatus } from '@prisma/client';
import { TICKET_MESSAGE_SELECT, toMessageView } from '@/common/mappers/ticket-message.mapper';
import { CreateReplyDto } from '@/common/dto/create-reply.dto';
import { AdminTicketsService } from '@/modules/admin/tickets/admin-tickets.service';
import { SocketService } from '@/modules/socket/socket.service';
import { TICKET_UPDATE_SELECT, toTicketUpdate } from '@/modules/socket/ticket-update.mapper';
import { PrismaService } from '@/prisma/prisma.service';
import { TicketMessageView } from '@/types/ticket.types';

@Injectable()
export class RepliesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ticketsService: AdminTicketsService,
    private readonly socket: SocketService,
  ) {}

  async create(ticketId: string, adminId: string, dto: CreateReplyDto): Promise<TicketMessageView> {
    const { status, authorId, assignedToId } = await this.ticketsService.getTicketRef(ticketId);
    if (status === TicketStatus.CLOSED) {
      throw new BadRequestException('This ticket is closed. Reopen it to reply.');
    }
    const nextStatus = status === TicketStatus.OPEN ? TicketStatus.IN_PROGRESS : status;

    const [row, ticket] = await this.prisma.$transaction([
      this.prisma.ticketMessage.create({
        data: { ticketId, senderId: adminId, body: dto.body },
        select: TICKET_MESSAGE_SELECT,
      }),
      this.prisma.ticket.update({
        where: { id: ticketId },
        data: { status: nextStatus, assignedToId: assignedToId ?? adminId },
        select: TICKET_UPDATE_SELECT,
      }),
    ]);

    const message = toMessageView(row);
    this.socket.replyAdded(authorId, { ticketId, message });
    this.socket.ticketUpdated(authorId, toTicketUpdate(ticket));
    return message;
  }
}
