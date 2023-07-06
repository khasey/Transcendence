
import { createContext } from 'react';
import { User } from '../../../../transcendence_backend/src/user/user.entity';

export interface MessageUser {
  id: number;
  username: string;
  imageUrl: string;
  text: string;
}

export interface Message {
  id: string;
  text: string;
  user: User | null; // Ajoutez la propriété "user" de type "User | null"
}

interface ChatContextProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export const ChatContext = createContext<ChatContextProps | null>(null);
