import { Injectable, Logger } from '@nestjs/common';
import { AiService } from '@/modules/ai/ai.service';
import { SocketService } from '@/modules/socket/socket.service';
import { TICKET_UPDATE_SELECT, toTicketUpdate } from '@/modules/socket/ticket-update.mapper';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class TicketTriageService {
  private readonly logger = new Logger(TicketTriageService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly aiService: AiService,
    private readonly socket: SocketService,
  ) {}

  triageInBackground(ticketId: string): void {
    void this.triage(ticketId).catch((error: unknown) =>
      this.logger.error(`Triage failed for ticket ${ticketId}`, error),
    );
  }

  private async triage(ticketId: string): Promise<void> {
    const ticket = await this.prisma.ticket.findUniqueOrThrow({
      where: { id: ticketId },
      select: { subject: true, description: true, book: { select: { status: true } } },
    });

    const classification = await this.aiService.classify(
      {
        subject: ticket.subject,
        description: ticket.description,
        bookStatus: ticket.book?.status ?? null,
      },
      ticketId,
    );

    const updated = await this.prisma.ticket.update({
      where: { id: ticketId },
      data: {
        category: classification.category,
        priority: classification.priority,
        classifiedBy: classification.provider,
      },
      select: TICKET_UPDATE_SELECT,
    });
    this.socket.ticketUpdated(updated.authorId, toTicketUpdate(updated));
    this.socket.ticketTriaged({
      ticketId,
      category: classification.category,
      priority: classification.priority,
      classifiedBy: classification.provider,
    });

    try {
      const draft = await this.aiService.generateDraft(ticketId);
      this.socket.draftReady({ ticketId, aiDraftAt: draft.aiDraftAt, provider: draft.provider });
    } catch {
      this.logger.warn(`No AI draft for ticket ${ticketId}; admin will reply manually`);
    }
  }
}
