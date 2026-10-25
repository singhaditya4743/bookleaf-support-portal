import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Auth } from '@/common/decorators/auth.decorator';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { CreateNoteDto } from '@/modules/admin/notes/dto/create-note.dto';
import { InternalNoteDto } from '@/modules/admin/notes/dto/note-response.dto';
import { NotesService } from '@/modules/admin/notes/notes.service';
import type { AuthUser } from '@/types/user.types';

@ApiTags('Admin - Notes')
@Auth(Role.ADMIN)
@Controller('admin/tickets/:ticketId/notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @ApiOperation({ summary: 'Add an internal note (never shown to the author)' })
  @ApiCreatedResponse({ type: InternalNoteDto })
  create(
    @CurrentUser() user: AuthUser,
    @Param('ticketId', ParseUUIDPipe) ticketId: string,
    @Body() dto: CreateNoteDto,
  ): Promise<InternalNoteDto> {
    return this.notesService.create(ticketId, user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List internal notes on a ticket' })
  @ApiOkResponse({ type: [InternalNoteDto] })
  findAll(@Param('ticketId', ParseUUIDPipe) ticketId: string): Promise<InternalNoteDto[]> {
    return this.notesService.findAll(ticketId);
  }
}
