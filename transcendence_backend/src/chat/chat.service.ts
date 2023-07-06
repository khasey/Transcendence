// chat.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatMessage } from './chat.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatMessage)
    private chatMessageRepository: Repository<ChatMessage>,
  ) {}

  async getAllMessages(): Promise<ChatMessage[]> {
    return this.chatMessageRepository.find();
  }
  
  async createMessage(text: string, senderId: number, channelId: number): Promise<ChatMessage> {
    const newMessage = this.chatMessageRepository.create({
      text,
      senderId,
      channelId,
    });

    return this.chatMessageRepository.save(newMessage);
  }
}
