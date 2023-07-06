import { Repository } from 'typeorm';
import { ChatMessage } from './chat.entity';
export declare class ChatService {
    private chatMessageRepository;
    constructor(chatMessageRepository: Repository<ChatMessage>);
    getAllMessages(): Promise<ChatMessage[]>;
    createMessage(text: string, senderId: number, channelId: number): Promise<ChatMessage>;
}
