"use client";
import { useOnFetch } from "@/common/hooks/useOnFetch";
import { useChatById } from "@/hooks/api/chatHooks";
import { ClientResponse, SuccessResponse } from "@/types";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

type Props = {
  chatId: number;
  socket: Socket;
};

export const useMessageList = ({ chatId, socket }: Props) => {
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [newMessages, setNewMessages] = useState<Message[]>([]);
  const { data, error, isError } = useChatById(chatId);

  useOnFetch(
    (clientResponse: ClientResponse<Chat>) => {
      if (isError) {
        throw error;
      } else {
        const successResponse = clientResponse as SuccessResponse<Chat>;
        const messages = successResponse.data.messages;
        setChatMessages(messages!);
      }
    },
    !!data || isError,
    data,
    false
  );

  useEffect(() => {
    socket.on("newMessage", (message: Message) => {
      setNewMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, []);
  useEffect(() => {
    if (chatId) setNewMessages([]);
  }, [chatId]);

  return {
    messages: chatMessages.concat(newMessages),
  };
};
