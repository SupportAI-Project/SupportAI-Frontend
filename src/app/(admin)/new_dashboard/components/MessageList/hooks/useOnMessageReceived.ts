"use client";
import { Message } from "@/types";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

type Props = {
  socket: Socket;
  chatId: number;
};
export const useOnMessagesReceived = ({ socket, chatId }: Props) => {
  const [newMessages, setNewMessages] = useState<Message[]>([]);
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

  return { newMessages };
};
