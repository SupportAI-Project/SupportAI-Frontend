import { ChatClient } from "@/api/chat.client";
import { ModelClient } from "@/api/model.client";
import { Chat } from "@/api/types/chat";
import { SuccessResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";

const modelClient = new ModelClient();
const chatClient = new ChatClient();

export function useModelGenerateGuide() {
  return useMutation({
    mutationFn: async (chatId: number) => {
      const chatResponse = await chatClient.chatById({
        id: chatId,
      });
      const chat = (chatResponse as SuccessResponse<Chat>).data;
      return modelClient.createGuide({
        user: {
          roles: chat.user.roles,
          username: chat.user.username,
        },
        messages: chat.messages.map((message) => ({
          content: message.content,
          isSupportSender: message.isSupportSender,
        })),
      });
    },
  });
}
