import { ApiPropertyOptional } from '@nestjs/swagger';
import { TicketCategory, TicketPriority, TicketStatus } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsEnum, IsInt, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';
import { TicketSort } from '@/types/admin-ticket.types';

export class TicketFiltersDto {
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

  @ApiPropertyOptional({ description: 'Created on or after this date', example: '2026-10-01' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  from?: Date;

  @ApiPropertyOptional({ description: 'Created on or before this date', example: '2026-10-31' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  to?: Date;

  @ApiPropertyOptional({ description: 'Search in subject, author name or email' })
  @IsOptional()
  @Transform(({ value }: { value: unknown }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @MaxLength(100)
  search?: string;

  @ApiPropertyOptional({ enum: TicketSort, enumName: 'TicketSort', default: TicketSort.Urgency })
  @IsOptional()
  @IsEnum(TicketSort)
  sort: TicketSort = TicketSort.Urgency;

  @ApiPropertyOptional({ default: 1, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @ApiPropertyOptional({ default: 20, minimum: 1, maximum: 100 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 20;
}
