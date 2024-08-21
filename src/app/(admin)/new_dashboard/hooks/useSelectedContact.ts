"use client";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { Contact } from "../types";

type Props = {
  socket: Socket;
};

export const useSelectedContact = ({ socket }: Props) => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    if (socket && selectedContact) {
      socket.emit("join", { chatId: selectedContact.chatId });
      return () => {
        socket.emit("leave", { chatId: selectedContact.chatId });
      };
    }
  }, [selectedContact]);

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact);
  };

  return {
    selectedContact,
    handleContactSelect,
  };
};
