import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  ADMIN_TICKET_SUMMARY_SELECT,
  toAdminTicketSummary,
} from '@/modules/admin/tickets/admin-tickets.mapper';
import { TicketFiltersDto } from '@/modules/admin/tickets/dto/ticket-filters.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { AdminTicketSummary, TicketSort } from '@/types/admin-ticket.types';
import { Paginated } from '@/types/api.types';

const SORT_ORDER: Record<TicketSort, Prisma.TicketOrderByWithRelationInput[]> = {
  [TicketSort.Urgency]: [{ status: 'asc' }, { priority: 'asc' }, { createdAt: 'asc' }],
  [TicketSort.Newest]: [{ createdAt: 'desc' }],
  [TicketSort.Oldest]: [{ createdAt: 'asc' }],
};

@Injectable()
export class AdminTicketsQueryService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filters: TicketFiltersDto): Promise<Paginated<AdminTicketSummary>> {
    const where = this.buildWhere(filters);
    const [rows, total] = await Promise.all([
      this.prisma.ticket.findMany({
        where,
        orderBy: SORT_ORDER[filters.sort],
        skip: (filters.page - 1) * filters.limit,
        take: filters.limit,
        select: ADMIN_TICKET_SUMMARY_SELECT,
      }),
      this.prisma.ticket.count({ where }),
    ]);

    return {
      items: rows.map(toAdminTicketSummary),
      total,
      page: filters.page,
      limit: filters.limit,
    };
  }

  private buildWhere({ status, category, priority, from, to, search }: TicketFiltersDto) {
    const where: Prisma.TicketWhereInput = { status, category, priority };

    if (from || to) {
      where.createdAt = { gte: from, lte: to ? this.endOfDay(to) : undefined };
    }

    if (search) {
      const contains = { contains: search, mode: Prisma.QueryMode.insensitive };
      where.OR = [
        { subject: contains },
        { author: { name: contains } },
        { author: { email: contains } },
      ];
    }

    return where;
  }

  private endOfDay(date: Date): Date {
    const end = new Date(date);
    end.setUTCHours(23, 59, 59, 999);
    return end;
  }
}
