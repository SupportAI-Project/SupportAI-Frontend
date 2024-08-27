"use client"
import { ReactNode } from "react";
import ChatPopup from "../components/ChatPopup";
import { useGlobalChat } from "@/app/hooks/useGlobalChat";

const GuideLayout = ({ children }: { children: ReactNode }) => {
  const { selectedContact } = useGlobalChat();

  return (
    <>
      {children}
      {selectedContact && <ChatPopup selectedContact={selectedContact} />}
    </>
  );
};

export default GuideLayout;
