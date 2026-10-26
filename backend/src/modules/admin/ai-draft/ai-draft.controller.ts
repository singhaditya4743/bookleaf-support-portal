import { Controller, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { Role } from '@prisma/client';
import { Auth } from '@/common/decorators/auth.decorator';
import { AI_DRAFT_THROTTLE } from '@/config/throttle.config';
import { AiDraftDto } from '@/modules/admin/tickets/dto/ai-draft.dto';
import { AiService } from '@/modules/ai/ai.service';

@ApiTags('Admin - AI')
@Auth(Role.ADMIN)
@Controller('admin/tickets/:ticketId/ai-draft')
export class AiDraftController {
  constructor(private readonly aiService: AiService) {}

  @Post()
  @Throttle(AI_DRAFT_THROTTLE)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Generate a fresh AI draft reply from the knowledge base' })
  @ApiOkResponse({ type: AiDraftDto })
  regenerate(@Param('ticketId', ParseUUIDPipe) ticketId: string): Promise<AiDraftDto> {
    return this.aiService.generateDraft(ticketId);
  }
}
