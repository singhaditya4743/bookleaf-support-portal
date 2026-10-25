import { ApiProperty } from '@nestjs/swagger';
import { AiProvider } from '@prisma/client';
import { InternalNoteDto } from '@/modules/admin/notes/dto/note-response.dto';
import { AdminTicketBaseDto } from '@/modules/admin/tickets/dto/admin-ticket-response.dto';
import { TicketMessageDto } from '@/modules/author/tickets/dto/ticket-response.dto';
import { AdminTicketDetail } from '@/types/admin-ticket.types';

export class AdminTicketDetailDto extends AdminTicketBaseDto implements AdminTicketDetail {
  @ApiProperty()
  description: string;

  @ApiProperty({ type: String, nullable: true })
  attachmentName: string | null;

  @ApiProperty({ enum: AiProvider, enumName: 'AiProvider', nullable: true })
  classifiedBy: AiProvider | null;

  @ApiProperty({ type: String, nullable: true, description: 'AI-drafted reply for the admin' })
  aiDraft: string | null;

  @ApiProperty({ type: Date, nullable: true })
  aiDraftAt: Date | null;

  @ApiProperty({ type: Date, nullable: true })
  resolvedAt: Date | null;

  @ApiProperty({ type: [TicketMessageDto] })
  messages: TicketMessageDto[];

  @ApiProperty({ type: [InternalNoteDto], description: 'Never visible to the author' })
  notes: InternalNoteDto[];
}
