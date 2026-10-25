import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Role, TicketStatus } from '@prisma/client';
import {
  ADMIN_TICKET_DETAIL_SELECT,
  toAdminTicketDetail,
} from '@/modules/admin/tickets/admin-tickets.mapper';
import { UpdateTicketDto } from '@/modules/admin/tickets/dto/update-ticket.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { AdminTicketDetail } from '@/types/admin-ticket.types';

const CLOSED_STATUSES: TicketStatus[] = [TicketStatus.RESOLVED, TicketStatus.CLOSED];

@Injectable()
export class AdminTicketsService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(ticketId: string): Promise<AdminTicketDetail> {
    const ticket = await this.prisma.ticket.findUnique({
      where: { id: ticketId },
      select: ADMIN_TICKET_DETAIL_SELECT,
    });
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }
    return toAdminTicketDetail(ticket);
  }

  async update(ticketId: string, dto: UpdateTicketDto): Promise<AdminTicketDetail> {
    if (Object.values(dto).every((value) => value === undefined)) {
      throw new BadRequestException('Provide at least one field to update');
    }

    const current = await this.getStatus(ticketId);
    if (dto.assignedToId) {
      await this.assertIsAdmin(dto.assignedToId);
    }

    const data: Prisma.TicketUncheckedUpdateInput = { ...dto };
    if (dto.status && dto.status !== current) {
      data.resolvedAt = CLOSED_STATUSES.includes(dto.status) ? new Date() : null;
    }

    await this.prisma.ticket.update({ where: { id: ticketId }, data });
    return this.findOne(ticketId);
  }

  async getStatus(ticketId: string): Promise<TicketStatus> {
    const ticket = await this.prisma.ticket.findUnique({
      where: { id: ticketId },
      select: { status: true },
    });
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }
    return ticket.status;
  }

  private async assertIsAdmin(userId: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });
    if (user?.role !== Role.ADMIN) {
      throw new BadRequestException('Tickets can only be assigned to an admin');
    }
  }
}
