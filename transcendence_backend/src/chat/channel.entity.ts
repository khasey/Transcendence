// channel.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ChatMessage } from './chat.entity';

@Entity()
export class Channel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: false })
  closed: boolean;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @Column()
  role: number;

  @Column()
  message_history: number;

  // Vous pouvez ajuster cette relation selon vos besoins
  @OneToMany(() => ChatMessage, (chatMessage) => chatMessage.channel)
  ChatMessage: ChatMessage[];
}
