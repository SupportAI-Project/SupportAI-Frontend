import { Contact } from '@/app/(admin)/new_dashboard/types';
import { useSocket } from '@/app/hooks/useSocket';
import React, { createContext, useState, useContext, ReactNode } from 'react';
import {useContacts, useSelectedContact} from '@/app/(admin)/new_dashboard/hooks';
interface ChatProviderProps {
    children: ReactNode;
}

export interface ChatContextValue {
  selectedContact: Contact | null;
  handleContactSelect: (contact: Contact) => void;
  contacts: Contact[];
}

export const ChatContext = createContext<ChatContextValue | null>(null);

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const socket = useSocket();
  const { selectedContact, handleContactSelect } = useSelectedContact({
    socket,
  });
  const { contacts } = useContacts({
    socket,
    handleContactSelect,
  });
  return (
    <ChatContext.Provider value={{ selectedContact, handleContactSelect,contacts }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useGlobalChatContext = () => useContext(ChatContext);
