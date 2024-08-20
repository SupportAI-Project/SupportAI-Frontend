"use client";
import { useEffect, useState } from "react";
import { Chat, ClientResponse, SuccessResponse } from "@/types";
import { useChats } from "@/hooks/api/chatHooks";
import { useOnFetch } from "@/common/hooks/useOnFetch";
import { Socket } from "socket.io-client";
import { Contact } from "../types";

type Props = {
  socket: Socket;
  handleContactSelect: (contact: Contact) => void;
};

export const useContacts = ({ socket, handleContactSelect }: Props) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const { isError, data, error } = useChats();

  useOnFetch(
    (clientResponse: ClientResponse<Chat[]>) => {
      if (isError) {
        throw error;
      } else {
        const successResponse = clientResponse as SuccessResponse<Chat[]>;
        const chats = successResponse.data;
        const contacts = chats.map((chat) => ({
          chatId: chat.chatId,
          userId: chat.user!.userId,
          username: chat.user!.username,
          isOpen: chat.isOpen,
        }));
        setContacts(() => contacts);
        handleContactSelect(contacts[0]);
      }
    },
    !!data || isError,
    data
  );

  useEffect(() => {
    socket.on("chatCreated", (chat: Chat) => {
      const contact = {
        chatId: chat.chatId,
        userId: chat.user!.userId,
        username: chat.user!.username,
        isOpen: chat.isOpen,
      };
      setContacts((prevContacts) => [...prevContacts, contact]);
    });

    return () => {
      socket.off("chatCreated");
    };
  }, []);

  return {
    contacts,
  };
};
