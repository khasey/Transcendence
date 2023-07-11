import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { User } from 'src/user/user.entity';

@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('chat message')
  handleMessage(@MessageBody() message: { text: string; user: User }): void {
    this.server.emit('chat message', message);
    console.log('user => '+User)
  }
}
