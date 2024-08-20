"use client";
import { ClientResponse, SuccessResponse } from "@/api/base.client";
import { useOnFetch } from "@/common/hooks/useOnFetch";
import { useChatById } from "@/hooks/api/chatHooks";
import { Chat, Message } from "@/types";
import { useState } from "react";

type Props = {
  chatId: number;
};

export const useMessageList = ({ chatId }: Props) => {
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  const { data, error, isError } = useChatById(chatId);

  useOnFetch(
    (clientResponse: ClientResponse<Chat>) => {
      if (isError) {
        throw error;
      } else {
        const successResponse = clientResponse as SuccessResponse<Chat>;
        const messages = successResponse.data.messages as Message[];
        setChatMessages(messages);
      }
    },
    !!data || isError,
    data,
    false
  );

  return {
    messages: chatMessages,
  };
};
