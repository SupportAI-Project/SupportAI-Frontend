"use client"
import { ReactNode } from "react";
import ChatPopup from "../components/ChatPopup";
import { useChat } from "@/app/hooks/useChat";

const GuideLayout = ({ children }: { children: ReactNode }) => {
  const { selectedContact } = useChat();

  return (
    <>
      {children}
      {selectedContact && <ChatPopup selectedContact={selectedContact} />}
    </>
  );
};

export default GuideLayout;
