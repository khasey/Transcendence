// chat.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatMessage } from './chat.entity';
import { Channel } from './channel.entity'; // Ajoutez l'importation de Channel

@Module({
  imports: [TypeOrmModule.forFeature([ChatMessage, Channel])], // Incluez Channel ici
  providers: [ChatGateway, ChatService],
  controllers: [ChatController], // Ajoutez le contrôleur
})
export class ChatModule {}
