import { Body, Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Auth } from '@/common/decorators/auth.decorator';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { CreateReplyDto } from '@/modules/admin/replies/dto/create-reply.dto';
import { RepliesService } from '@/modules/admin/replies/replies.service';
import { TicketMessageDto } from '@/modules/author/tickets/dto/ticket-response.dto';
import type { AuthUser } from '@/types/user.types';

@ApiTags('Admin - Replies')
@Auth(Role.ADMIN)
@Controller('admin/tickets/:ticketId/replies')
export class RepliesController {
  constructor(private readonly repliesService: RepliesService) {}

  @Post()
  @ApiOperation({ summary: 'Reply to the author. Moves an open ticket to In Progress' })
  @ApiCreatedResponse({ type: TicketMessageDto })
  create(
    @CurrentUser() user: AuthUser,
    @Param('ticketId', ParseUUIDPipe) ticketId: string,
    @Body() dto: CreateReplyDto,
  ): Promise<TicketMessageDto> {
    return this.repliesService.create(ticketId, user.id, dto);
  }
}
