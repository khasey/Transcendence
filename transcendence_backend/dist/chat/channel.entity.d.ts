import { ChatMessage } from './chat.entity';
export declare class Channel {
    id: number;
    name: string;
    closed: boolean;
    created: Date;
    role: number;
    message_history: number;
    ChatMessage: ChatMessage[];
}
