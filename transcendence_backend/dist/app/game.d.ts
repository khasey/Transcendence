import { Server } from 'socket.io';
export declare class GameGateway {
    server: Server;
    player1Score: number;
    player2Score: number;
    handleConnection(client: any): void;
    handleDisconnect(client: any): void;
    handlePaddleMove(client: any, data: {
        y: number;
    }): void;
    sendScoreUpdate(client: any): void;
}
