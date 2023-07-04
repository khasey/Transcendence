// ChatContext.tsx
import React from 'react';

interface IChatContext {
  messages: string[];
  setMessages: React.Dispatch<React.SetStateAction<string[]>>;
}

export const ChatContext = React.createContext<IChatContext | undefined>(undefined);
