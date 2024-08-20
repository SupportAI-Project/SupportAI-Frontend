"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { schema } from "../validations/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Socket } from "socket.io-client";

type MessageRequest = {
  message: string;
};
type Props = {
  chatId: number;
  socket: Socket;
};

export const useMessage = ({ chatId, socket }: Props) => {
  const [isNote, setIsNote] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MessageRequest>({
    resolver: zodResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const handleSendMessage = (messageRequest: MessageRequest) => {
    const newMessage = messageRequest.message;
    const data = {
      chatId: chatId,
      content: newMessage,
    };
    const allMessage = {
      data: data,
      isSupportSender: true,
      isNote: isNote,
    };

    if (chatId) {
      socket.emit("message", allMessage);
      reset({
        message: "",
      });
    }
  };
  return {
    isNote,
    handleChangeNote: () => setIsNote(!isNote),
    register,
    handleSubmit: handleSubmit(handleSendMessage),
    errors,
  };
};
