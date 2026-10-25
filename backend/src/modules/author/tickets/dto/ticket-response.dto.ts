import { ApiProperty } from '@nestjs/swagger';
import { Role, TicketCategory, TicketStatus } from '@prisma/client';
import {
  AuthorTicketDetail,
  AuthorTicketSummary,
  TicketBookRef,
  TicketMessageView,
} from '@/types/ticket.types';

export class TicketBookRefDto implements TicketBookRef {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ example: 'Between Two Temples' })
  title: string;
}

class TicketBaseDto {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ example: 'Royalty not received' })
  subject: string;

  @ApiProperty({ enum: TicketStatus, enumName: 'TicketStatus', example: TicketStatus.OPEN })
  status: TicketStatus;

  @ApiProperty({ enum: TicketCategory, enumName: 'TicketCategory' })
  category: TicketCategory;

  @ApiProperty({ type: TicketBookRefDto, nullable: true })
  book: TicketBookRefDto | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class AuthorTicketSummaryDto extends TicketBaseDto implements AuthorTicketSummary {
  @ApiProperty({ example: 1 })
  replyCount: number;
}

export class TicketMessageDto implements TicketMessageView {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty()
  body: string;

  @ApiProperty({ example: 'Support Team' })
  senderName: string;

  @ApiProperty({ enum: Role, enumName: 'Role', example: Role.ADMIN })
  senderRole: Role;

  @ApiProperty()
  createdAt: Date;
}

export class AuthorTicketDetailDto extends TicketBaseDto implements AuthorTicketDetail {
  @ApiProperty()
  description: string;

  @ApiProperty({ type: String, nullable: true, example: 'royalty-statement.pdf' })
  attachmentName: string | null;

  @ApiProperty({ type: Date, nullable: true })
  resolvedAt: Date | null;

  @ApiProperty({ type: [TicketMessageDto] })
  messages: TicketMessageDto[];
}
