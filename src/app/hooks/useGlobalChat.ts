'use client';
import { useContext } from 'react';
import { ChatContextValue } from '../providers/ChatProvider/provider';
import { ChatContext } from '../providers/ChatProvider/provider';

export const useGlobalChat = (): ChatContextValue => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useGlobalChat must be used within a ChatProvider');
  }
  return context;
};
