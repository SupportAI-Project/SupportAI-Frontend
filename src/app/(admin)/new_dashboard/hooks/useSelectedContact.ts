"use client";
import { useEffect, useState } from "react";
import { Chat } from "@/types";
import { Socket } from "socket.io-client";

type Props = {
  socket: Socket;
};

export const useSelectedContact = ({ socket }: Props) => {
  const [selectedContact, setSelectedContact] = useState<Chat | null>(null);

  useEffect(() => {
    if (socket && selectedContact) {
      socket.emit("join", { chatId: selectedContact.chatId });
      return () => {
        socket.emit("leave", { chatId: selectedContact.chatId });
      };
    }
  }, [selectedContact]);

  const handleContactSelect = (chat: Chat) => {
    setSelectedContact(chat);
  };

  return {
    selectedContact,
    handleContactSelect,
  };
};
