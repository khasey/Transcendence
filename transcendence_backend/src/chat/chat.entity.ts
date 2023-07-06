// chat.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Channel } from './channel.entity';

@Entity({ name: 'Message' })
export class ChatMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  senderId: number;

  @Column()
  channelId: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.username) // Utiliser "chatMessages" en minuscules ici
  @JoinColumn({ name: 'senderId' })
  sender: User;

  @ManyToOne(() => Channel, (channel) => channel.id) // Utiliser "chatMessages" en minuscules ici aussi
  @JoinColumn({ name: 'channelId' })
  channel: Channel;
}
