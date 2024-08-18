import { useEffect, useState } from "react";
import { Chat } from "@/types";
import { useChats } from "@/hooks/api/chatHooks";
import { SuccessResponse } from "@/api/base.client";
import socket from "@/socket";

export const useContacts = () => {
  const [contacts, setContacts] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  const { isError, data, error } = useChats();

  useEffect(() => {
    if (data) {
      const { data: chats } = data as SuccessResponse<Chat[]>;
      setContacts(chats);
      setSelectedChat(chats[0]);
    }
  }, [data]);

  if (isError) {
    console.error(error);
  }

  useEffect(() => {
    //If user creates a new chat
    socket.on("chatCreated", (chat: Chat) => {
      setContacts((prevChats) => [...prevChats, chat]);
    });

    return () => {
      socket.off("chatCreated");
    };
  }, []);
  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat);
  };

  return {
    contacts,
    selectedChat,
    handleChatSelect,
  };
};
