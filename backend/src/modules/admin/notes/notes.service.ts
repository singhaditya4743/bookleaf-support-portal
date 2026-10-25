import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateNoteDto } from '@/modules/admin/notes/dto/create-note.dto';
import { AdminTicketsService } from '@/modules/admin/tickets/admin-tickets.service';
import { PrismaService } from '@/prisma/prisma.service';
import { InternalNoteView } from '@/types/note.types';

const NOTE_SELECT = {
  id: true,
  body: true,
  createdAt: true,
  admin: { select: { name: true } },
} satisfies Prisma.InternalNoteSelect;

type NoteRow = Prisma.InternalNoteGetPayload<{ select: typeof NOTE_SELECT }>;

function toNoteView({ admin, ...note }: NoteRow): InternalNoteView {
  return { ...note, adminName: admin.name };
}

@Injectable()
export class NotesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ticketsService: AdminTicketsService,
  ) {}

  async create(ticketId: string, adminId: string, dto: CreateNoteDto): Promise<InternalNoteView> {
    await this.ticketsService.getStatus(ticketId);
    const note = await this.prisma.internalNote.create({
      data: { ticketId, adminId, body: dto.body },
      select: NOTE_SELECT,
    });
    return toNoteView(note);
  }

  async findAll(ticketId: string): Promise<InternalNoteView[]> {
    await this.ticketsService.getStatus(ticketId);
    const notes = await this.prisma.internalNote.findMany({
      where: { ticketId },
      orderBy: { createdAt: 'asc' },
      select: NOTE_SELECT,
    });
    return notes.map(toNoteView);
  }
}
