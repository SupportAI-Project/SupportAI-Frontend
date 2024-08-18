import { useEffect, useState } from "react";
import { Chat, Message } from "@/types";
import socket from "@/socket";
import { useChatById } from "@/hooks/api/chatHooks";
import { SuccessResponse } from "@/api/base.client";

export const useChat = (chatId: number | null) => {
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [isNote, setIsNote] = useState<boolean>(false);

  const { data, error, isError } = useChatById(chatId);
  useEffect(() => {
    if (chatId) {
      socket.emit("join", { chatId });

      socket.on("newMessage", (message: Message) => {
        setChatMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        socket.off("newMessage");
        socket.emit("leave", { chatId });
      };
    }
  }, [chatId]);

  useEffect(() => {
    if (isError) {
      console.error(error);
    }
    if (data) {
      const { data: chat } = data as SuccessResponse<Chat>;
      const messages = chat.messages as Message[];
      setChatMessages(messages);
    }
  }, [data, error, isError]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.split("\n").length > 10) return;
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") {
      return;
    }

    const data = {
      chatId: chatId,
      content: newMessage,
    };
    const allMessage = {
      data: data,
      isSupportSender: true,
      isNote: isNote,
    };
    console.log("Message:", newMessage);

    if (chatId) {
      const fd = new FormData();
      fd.append("data", JSON.stringify(data));
      fd.append("isSupportSender", "true");
      fd.append("isNote", isNote.toString());
      socket.emit("message", allMessage);
      setNewMessage("");
    }
  };
  return {
    chatMessages,
    handleSendMessage,
    newMessage,
    handleChange,
    isNote,
    handleChangeNote: () => setIsNote(!isNote),
  };
};
