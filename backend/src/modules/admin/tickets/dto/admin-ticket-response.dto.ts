import { ApiProperty } from '@nestjs/swagger';
import { TicketCategory, TicketPriority, TicketStatus } from '@prisma/client';
import { TicketBookRefDto } from '@/modules/author/tickets/dto/ticket-response.dto';
import { AdminTicketSummary, TicketAssigneeRef, TicketAuthorRef } from '@/types/admin-ticket.types';
import { Paginated } from '@/types/api.types';

export class TicketAuthorRefDto implements TicketAuthorRef {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ example: 'Ananya Reddy' })
  name: string;

  @ApiProperty({ example: 'ananya.reddy@email.com' })
  email: string;
}

export class TicketAssigneeRefDto implements TicketAssigneeRef {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ example: 'BookLeaf Admin' })
  name: string;
}

export class AdminTicketBaseDto {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ example: 'Royalty not received' })
  subject: string;

  @ApiProperty({ enum: TicketStatus, enumName: 'TicketStatus' })
  status: TicketStatus;

  @ApiProperty({ enum: TicketCategory, enumName: 'TicketCategory' })
  category: TicketCategory;

  @ApiProperty({ enum: TicketPriority, enumName: 'TicketPriority' })
  priority: TicketPriority;

  @ApiProperty({ type: TicketAuthorRefDto })
  author: TicketAuthorRefDto;

  @ApiProperty({ type: TicketBookRefDto, nullable: true })
  book: TicketBookRefDto | null;

  @ApiProperty({ type: TicketAssigneeRefDto, nullable: true })
  assignedTo: TicketAssigneeRefDto | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class AdminTicketSummaryDto extends AdminTicketBaseDto implements AdminTicketSummary {
  @ApiProperty({ example: 0 })
  replyCount: number;
}

export class AdminTicketListDto implements Paginated<AdminTicketSummaryDto> {
  @ApiProperty({ type: [AdminTicketSummaryDto] })
  items: AdminTicketSummaryDto[];

  @ApiProperty({ example: 42 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 20 })
  limit: number;
}
