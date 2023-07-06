import { User } from '../user/user.entity';
import { Channel } from './channel.entity';
export declare class ChatMessage {
    id: number;
    text: string;
    senderId: number;
    channelId: number;
    createdAt: Date;
    sender: User;
    channel: Channel;
}
