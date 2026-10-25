import { ApiPropertyOptional } from '@nestjs/swagger';
import { TicketCategory, TicketPriority, TicketStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';

export class UpdateTicketDto {
  @ApiPropertyOptional({ enum: TicketStatus, enumName: 'TicketStatus' })
  @IsOptional()
  @IsEnum(TicketStatus)
  status?: TicketStatus;

  @ApiPropertyOptional({ enum: TicketCategory, enumName: 'TicketCategory' })
  @IsOptional()
  @IsEnum(TicketCategory)
  category?: TicketCategory;

  @ApiPropertyOptional({ enum: TicketPriority, enumName: 'TicketPriority' })
  @IsOptional()
  @IsEnum(TicketPriority)
  priority?: TicketPriority;

  @ApiPropertyOptional({
    type: String,
    format: 'uuid',
    nullable: true,
    description: 'Admin to assign the ticket to. Send null to unassign.',
  })
  @IsOptional()
  @IsUUID('4', { message: 'assignedToId must be a valid user id' })
  assignedToId?: string | null;
}
