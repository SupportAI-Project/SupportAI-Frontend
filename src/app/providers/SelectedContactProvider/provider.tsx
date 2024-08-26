import { Contact } from '@/app/(admin)/new_dashboard/types';
import { useSocket } from '@/app/hooks/useSocket';
import React, { createContext, useState, useContext, ReactNode } from 'react';
import {useContacts, useSelectedContact} from '@/app/(admin)/new_dashboard/hooks';
interface ContactProviderProps {
    children: ReactNode;
}

export interface SelectedContactContextValue {
  selectedContact: Contact | null;
  handleContactSelect: (contact: Contact) => void;
  contacts: Contact[];
}

export const SelectedContactContext = createContext<SelectedContactContextValue | null>(null);

export const SelectedContactProvider: React.FC<ContactProviderProps> = ({ children }) => {
  const socket = useSocket();
  const { selectedContact, handleContactSelect } = useSelectedContact({
    socket,
  });
  const { contacts } = useContacts({
    socket,
    handleContactSelect,
  });
  return (
    <SelectedContactContext.Provider value={{ selectedContact, handleContactSelect,contacts }}>
      {children}
    </SelectedContactContext.Provider>
  );
};

export const useGlobalSelectedContact = () => useContext(SelectedContactContext);
