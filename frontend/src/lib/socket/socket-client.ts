import { io, Socket } from 'socket.io-client';
import { API_URL } from '@/lib/api/client';

const SOCKET_URL = new URL(API_URL).origin;

let socket: Socket | null = null;
let socketToken: string | null = null;

export function connectSocket(token: string): Socket {
  if (socket && socketToken === token) return socket;
  socket?.disconnect();
  socketToken = token;
  socket = io(SOCKET_URL, { auth: { token }, transports: ['websocket'] });
  return socket;
}

export function disconnectSocket(): void {
  socket?.disconnect();
  socket = null;
  socketToken = null;
}
