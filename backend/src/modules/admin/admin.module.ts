import { Module } from '@nestjs/common';
import { NotesController } from '@/modules/admin/notes/notes.controller';
import { NotesService } from '@/modules/admin/notes/notes.service';
import { RepliesController } from '@/modules/admin/replies/replies.controller';
import { RepliesService } from '@/modules/admin/replies/replies.service';
import { AdminTicketsQueryService } from '@/modules/admin/tickets/admin-tickets-query.service';
import { AdminTicketsController } from '@/modules/admin/tickets/admin-tickets.controller';
import { AdminTicketsService } from '@/modules/admin/tickets/admin-tickets.service';

@Module({
  controllers: [AdminTicketsController, RepliesController, NotesController],
  providers: [AdminTicketsService, AdminTicketsQueryService, RepliesService, NotesService],
})
export class AdminModule {}
