import { ClientResponse, SuccessResponse } from "@/api/base.client";
import { ChatClient } from "@/api/chat.client";
import { ChatResponse } from "@/api/types/chat";
import { Chat } from "@/types";
import { useQuery } from "@tanstack/react-query";

const chatClient = new ChatClient();

export function useChats() {
  return useQuery<ClientResponse<ChatResponse[]>, Error>({
    queryKey: ["chats"],
    queryFn: () => chatClient.chats(),
  });
}

export function useChatById(chatId: number) {
  return useQuery<ClientResponse<ChatResponse>, Error>({
    queryKey: ["chatID", chatId],
    queryFn: () => chatClient.chatById({ chatId }),
  });
}
