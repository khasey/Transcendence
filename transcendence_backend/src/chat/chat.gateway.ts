import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway {

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('chat message')
  handleMessage(@MessageBody() message: string): void {
    console.log("message recu serveur => " + message);
    this.server.emit('chat message', message);
  }
}
