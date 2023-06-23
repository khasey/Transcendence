import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Server } from 'socket.io';

const canvasHeight = 800;
const paddleHeight = 100;
@WebSocketGateway()
export class GameGateway {
  @WebSocketServer()
  server: Server;


  player1Score: number = 0;
  player2Score: number = 0;

  handleConnection(client: any) {
    console.log('Client connected');
    this.sendScoreUpdate(client);
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected');
    this.player1Score = 0;
    this.player2Score = 0;
    this.server.emit('playerDisconnected');
  }

  @SubscribeMessage('paddleMove')
  handlePaddleMove(client: any, data: { y: number }) {
    this.server.emit('paddleMove', data);

    if (data.y + paddleHeight > canvasHeight || data.y < 0) {
      if (data.y + paddleHeight > canvasHeight) {
        this.player1Score++;
      } else {
        this.player2Score++;
      }
      this.sendScoreUpdate(client);
    }
  }

  sendScoreUpdate(client: any) {
    client.emit('scoreUpdate', {
      player1Score: this.player1Score,
      player2Score: this.player2Score,
    });
    client.broadcast.emit('scoreUpdate', {
      player1Score: this.player1Score,
      player2Score: this.player2Score,
    });
  }
}