import { ChatClient } from "@/api/chat.client";
import { useQuery } from "@tanstack/react-query";

const chatClient = new ChatClient();

export function useChats() {
  return useQuery({
    queryKey: ["chats"],
    queryFn: () => chatClient.chats(),
  });
}

export function useChatById(chatId: number | null) {
  return useQuery({
    queryKey: chatId ? ["chats", chatId] : ["random"],
    queryFn: chatId ? () => chatClient.chatById({ chatId }) : undefined,
    enabled: !!chatId,
  });
}
