import { Injectable } from '@nestjs/common';
import { SocketGateway } from '@/modules/socket/socket.gateway';
import {
  ADMINS_ROOM,
  AdminTicketUpdate,
  authorRoom,
  SocketEvent,
  TicketCreatedEvent,
  TicketDraftReadyEvent,
  TicketNoteEvent,
  TicketReplyEvent,
  TicketTriagedEvent,
} from '@/types/socket.types';

@Injectable()
export class SocketService {
  constructor(private readonly gateway: SocketGateway) {}

  ticketCreated(event: TicketCreatedEvent): void {
    this.toAdmins(SocketEvent.TicketCreated, event);
  }

  ticketTriaged(event: TicketTriagedEvent): void {
    this.toAdmins(SocketEvent.TicketTriaged, event);
  }

  draftReady(event: TicketDraftReadyEvent): void {
    this.toAdmins(SocketEvent.TicketDraftReady, event);
  }

  noteAdded(event: TicketNoteEvent): void {
    this.toAdmins(SocketEvent.TicketNote, event);
  }

  ticketUpdated(authorId: string, update: AdminTicketUpdate): void {
    const { ticketId, status, category, updatedAt } = update;
    this.toAuthor(authorId, SocketEvent.TicketUpdated, { ticketId, status, category, updatedAt });
    this.toAdmins(SocketEvent.TicketUpdated, update);
  }

  replyAdded(authorId: string, event: TicketReplyEvent): void {
    this.toAuthor(authorId, SocketEvent.TicketReply, event);
    this.toAdmins(SocketEvent.TicketReply, event);
  }

  private toAuthor(authorId: string, event: SocketEvent, payload: object): void {
    this.gateway.server?.to(authorRoom(authorId)).emit(event, payload);
  }

  private toAdmins(event: SocketEvent, payload: object): void {
    this.gateway.server?.to(ADMINS_ROOM).emit(event, payload);
  }
}
