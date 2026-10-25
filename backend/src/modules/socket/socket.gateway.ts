import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  OnGatewayConnection,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Role } from '@prisma/client';
import { Server, Socket } from 'socket.io';
import { ADMINS_ROOM, authorRoom, SocketData } from '@/types/socket.types';
import { JwtPayload } from '@/types/user.types';

type AppSocket = Socket<
  Record<string, never>,
  Record<string, never>,
  Record<string, never>,
  SocketData
>;

@WebSocketGateway({ path: '/socket.io' })
export class SocketGateway implements OnGatewayInit, OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(SocketGateway.name);

  constructor(private readonly jwtService: JwtService) {}

  afterInit(server: Server): void {
    server.use((socket: AppSocket, next) => {
      this.authenticate(socket)
        .then(() => next())
        .catch(() => next(new Error('Unauthorized')));
    });
  }

  async handleConnection(socket: AppSocket): Promise<void> {
    const { user } = socket.data;
    const room = user.role === Role.ADMIN ? ADMINS_ROOM : authorRoom(user.id);
    await socket.join(room);
    this.logger.log(`${user.email} joined ${room}`);
  }

  private async authenticate(socket: AppSocket): Promise<void> {
    const auth = socket.handshake.auth as { token?: unknown };
    const header = socket.handshake.headers.authorization?.replace(/^Bearer /, '');
    const token = typeof auth.token === 'string' ? auth.token : header;
    if (!token) {
      throw new Error('Missing token');
    }
    const payload = await this.jwtService.verifyAsync<JwtPayload>(token);
    socket.data.user = { id: payload.sub, email: payload.email, role: payload.role };
  }
}
