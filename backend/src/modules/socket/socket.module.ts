import { Global, Module } from '@nestjs/common';
import { SocketGateway } from '@/modules/socket/socket.gateway';
import { SocketService } from '@/modules/socket/socket.service';

@Global()
@Module({
  providers: [SocketGateway, SocketService],
  exports: [SocketService],
})
export class SocketModule {}
