"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const canvasHeight = 800;
const paddleHeight = 100;
let GameGateway = exports.GameGateway = class GameGateway {
    constructor() {
        this.player1Score = 0;
        this.player2Score = 0;
    }
    handleConnection(client) {
        console.log('Client connected');
        this.sendScoreUpdate(client);
    }
    handleDisconnect(client) {
        console.log('Client disconnected');
        this.player1Score = 0;
        this.player2Score = 0;
        this.server.emit('playerDisconnected');
    }
    handlePaddleMove(client, data) {
        this.server.emit('paddleMove', data);
        if (data.y + paddleHeight > canvasHeight || data.y < 0) {
            if (data.y + paddleHeight > canvasHeight) {
                this.player1Score++;
            }
            else {
                this.player2Score++;
            }
            this.sendScoreUpdate(client);
        }
    }
    sendScoreUpdate(client) {
        client.emit('scoreUpdate', {
            player1Score: this.player1Score,
            player2Score: this.player2Score,
        });
        client.broadcast.emit('scoreUpdate', {
            player1Score: this.player1Score,
            player2Score: this.player2Score,
        });
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], GameGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('paddleMove'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "handlePaddleMove", null);
exports.GameGateway = GameGateway = __decorate([
    (0, websockets_1.WebSocketGateway)()
], GameGateway);
//# sourceMappingURL=game.js.map