import { useEffect, useState } from "react";
import { useChatByUserId } from "@/hooks/api/chatHooks";
import { Socket } from "socket.io-client";

type Props = {
  userId: number;
  socket: Socket;
};
type Chat = {
  chatId: number;
};

export const useChat = ({ userId, socket }: Props) => {
  const [chatId, setChatId] = useState<number | null>(null);
  const { data, error } = useChatByUserId(userId);
  useEffect(() => {
    if (data) {
      if (data.user?.userId !== userId) {
        socket.emit("create");
        socket.on("chatCreated", (chat: Chat) => {
          socket.emit("join", { chatId: chat.chatId });
          setChatId(chat.chatId);
        });
        return;
      }
      if (data.chatId) {
        console.log("Chat exists");
        socket.emit("join", { chatId: data.chatId });
        setChatId(data.chatId);
      }
    }
  }, [data]);
  return { chatId, error };
};
