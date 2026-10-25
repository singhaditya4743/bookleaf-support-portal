import { ApiProperty } from '@nestjs/swagger';
import { AiProvider } from '@prisma/client';
import { AiDraftResult } from '@/types/ai.types';

export class AiDraftDto implements AiDraftResult {
  @ApiProperty({ example: 'Hi Ananya,\n\nThank you for reaching out...' })
  aiDraft: string;

  @ApiProperty()
  aiDraftAt: Date;

  @ApiProperty({ enum: AiProvider, enumName: 'AiProvider', example: AiProvider.GEMINI })
  provider: AiProvider;
}
