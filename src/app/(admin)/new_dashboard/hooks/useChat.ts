import { useState } from "react";
import { Message } from "../types";

export const useChat = () => {
  // Initial dummy messages
  const initialMessages: Message[] = [
    { sender: "User 1", text: "Hello!", timestamp: "10:00 AM" },
    { sender: "User 2", text: "Hi there!", timestamp: "10:01 AM" },
  ];

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  const clearMessage = () => {
    setNewMessage("");
  };

  const addMessage = (message: Message) => {
    if (newMessage.trim()) {
      setMessages((prevMessages) => [...prevMessages, message]);
      clearMessage();
    }
  };

  const handleSend = (sender: string) => {
    if (newMessage.trim()) {
      const newMessageObj: Message = {
        sender,
        text: newMessage,
        timestamp: new Date().toLocaleTimeString(),
      };
      addMessage(newMessageObj);
    }
  };

  return { messages, newMessage, handleChange, handleSend };
};
