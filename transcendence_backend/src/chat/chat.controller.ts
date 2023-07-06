// chat.controller.ts

import { Controller, Get, Post, Body } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatMessage } from './chat.entity';

@Controller('chat')
export class ChatController {
  prisma: any;
  constructor(private chatService: ChatService) {}

  @Get()
  async getAllMessages(): Promise<ChatMessage[]> {
    return this.chatService.getAllMessages();
  }

@Post()
async createMessage(@Body() messageData: { text: string; senderId: number; channelId: number }): Promise<ChatMessage> {
  const { text, senderId, channelId } = messageData;
  return this.prisma.chatMessage.create({
    data: {
      text,
      senderId,
      channelId,
    },
  });
}
}
