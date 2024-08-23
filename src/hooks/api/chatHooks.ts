import { ChatClient } from '@/api/chat.client';
import { Chat, ClientResponse, SuccessResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';

const chatClient = new ChatClient();

export function useChats() {
  return useQuery<ClientResponse<Chat[]>, Error>({
    queryKey: ['chats'],
    queryFn: () => chatClient.chats(),
    refetchOnWindowFocus: false,
  });
}

export function useChatById(chatId: number) {
  return useQuery<ClientResponse<Chat>, Error>({
    queryKey: ['chatID', chatId],
    queryFn: () => chatClient.chatById({ id: chatId }),
    refetchOnWindowFocus: false,
  });
}

export function useChatByUserId(userId: number) {
  return useQuery<Chat | undefined>({
    queryKey: ['chatUserID', userId],
    queryFn: async () => {
      const result = (await chatClient.chats()) as ClientResponse<Chat[]>;
      if (result instanceof Error) {
        throw result;
      }
      const data = result as SuccessResponse<Chat[]>;
      const chats = data.data as Chat[];

      return (
        chats.find((chat) => chat.user?.id === userId && chat.isOpen) ||
        chats[0]
      );
    },
  });
}
