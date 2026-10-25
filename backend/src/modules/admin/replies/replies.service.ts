import { Injectable } from '@nestjs/common';
import { TicketStatus } from '@prisma/client';
import { TICKET_MESSAGE_SELECT, toMessageView } from '@/common/mappers/ticket-message.mapper';
import { CreateReplyDto } from '@/modules/admin/replies/dto/create-reply.dto';
import { AdminTicketsService } from '@/modules/admin/tickets/admin-tickets.service';
import { PrismaService } from '@/prisma/prisma.service';
import { TicketMessageView } from '@/types/ticket.types';

@Injectable()
export class RepliesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ticketsService: AdminTicketsService,
  ) {}

  async create(ticketId: string, adminId: string, dto: CreateReplyDto): Promise<TicketMessageView> {
    const status = await this.ticketsService.getStatus(ticketId);

    const [message] = await this.prisma.$transaction([
      this.prisma.ticketMessage.create({
        data: { ticketId, senderId: adminId, body: dto.body },
        select: TICKET_MESSAGE_SELECT,
      }),
      this.prisma.ticket.update({
        where: { id: ticketId },
        data: { status: status === TicketStatus.OPEN ? TicketStatus.IN_PROGRESS : status },
      }),
    ]);

    return toMessageView(message);
  }
}
