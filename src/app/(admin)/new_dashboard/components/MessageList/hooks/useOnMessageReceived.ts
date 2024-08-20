"use client";
import { Message } from "@/types";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

type Props = {
  socket: Socket;
};
export const useOnMessagesReceived = ({ socket }: Props) => {
  const [newMessages, setNewMessages] = useState<Message[]>([]);
  useEffect(() => {
    socket.on("newMessage", (message: Message) => {
      setNewMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, []);
  return { newMessages };
};
