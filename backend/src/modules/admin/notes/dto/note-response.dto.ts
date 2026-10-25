import { ApiProperty } from '@nestjs/swagger';
import { InternalNoteView } from '@/types/note.types';

export class InternalNoteDto implements InternalNoteView {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ example: 'Checked with finance, payout is scheduled for next cycle.' })
  body: string;

  @ApiProperty({ example: 'BookLeaf Admin' })
  adminName: string;

  @ApiProperty()
  createdAt: Date;
}
