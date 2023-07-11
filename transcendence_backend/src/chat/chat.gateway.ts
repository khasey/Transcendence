import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway {

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('chat message')
  handleMessage(@MessageBody() message: { text: string, user: string }): void {
  const { text, user } = message;
  console.log("yo mess => " + text + " from =>" + user);
  console.log("message recu serveur => " + text);
  this.server.emit('chat message', text);
  }
}
