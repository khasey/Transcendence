import { ChatService } from './chat.service';
import { ChatMessage } from './chat.entity';
export declare class ChatController {
    private chatService;
    prisma: any;
    constructor(chatService: ChatService);
    getAllMessages(): Promise<ChatMessage[]>;
    createMessage(messageData: {
        text: string;
        senderId: number;
        channelId: number;
    }): Promise<ChatMessage>;
}
