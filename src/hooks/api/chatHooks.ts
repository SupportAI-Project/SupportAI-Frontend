import { ChatClient } from "@/api/chat.client";
import { Chat, ClientResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

const chatClient = new ChatClient();

export function useChats() {
  return useQuery<ClientResponse<Chat[]>, Error>({
    queryKey: ["chats"],
    queryFn: () => chatClient.chats(),
  });
}

export function useChatById(chatId: number) {
  return useQuery<ClientResponse<Chat>, Error>({
    queryKey: ["chatID", chatId],
    queryFn: () => chatClient.chatById({ chatId }),
  });
}
