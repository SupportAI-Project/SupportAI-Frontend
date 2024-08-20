"use client";
import { useEffect, useState } from "react";
import { Chat } from "@/types";
import { useChats } from "@/hooks/api/chatHooks";
import { ClientResponse, SuccessResponse } from "@/api/base.client";
import { useOnFetch } from "@/common/hooks/useOnFetch";
import { Socket } from "socket.io-client";

type Props = {
  socket: Socket;
  handleContactSelect: (contact: Chat) => void;
};

export const useContacts = ({ socket, handleContactSelect }: Props) => {
  const [contacts, setContacts] = useState<Chat[]>([]);
  const { isError, data, error } = useChats();

  useOnFetch(
    (clientResponse: ClientResponse<Chat[]>) => {
      if (isError) {
        throw error;
      } else {
        const successResponse = clientResponse as SuccessResponse<Chat[]>;
        const chats = successResponse.data;
        setContacts(() => chats);
        handleContactSelect(chats[0]);
      }
    },
    !!data || isError,
    data
  );

  useEffect(() => {
    socket.on("chatCreated", (chat: Chat) => {
      setContacts((prevContacts) => [...prevContacts, chat]);
    });

    return () => {
      socket.off("chatCreated");
    };
  }, []);

  return {
    contacts,
  };
};
