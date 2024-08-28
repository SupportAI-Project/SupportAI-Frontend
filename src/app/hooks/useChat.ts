'use client';
import { useContext } from 'react';
import { ChatContextValue } from '../providers/ChatProvider/provider';
import { ChatContext } from '../providers/ChatProvider/provider';

export const useChat = (): ChatContextValue => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
