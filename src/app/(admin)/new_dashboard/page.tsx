"use client";
import { useState } from "react";
import PageContainer from "@/components/PageContainer";
import DashboardCard from "./shared/Card";
import MessageInput from "./components/MessageInput";
import { Box } from "@mui/material";
import ContactList from "./components/ContactList";
import ChatHeader from "./components/ChatHeader";

import MessageList from "./components/MessageList";

import { Message, Contact } from "./types";

const Page = () => {
  const initialContacts: Contact[] = [
    {
      name: "Alice",
      avatar: "/avatar1.png",
      lastMessage: "See you later!",
    },
    {
      name: "Bob",
      avatar: "/avatar2.png",
      lastMessage: "Let's catch up tomorrow.",
    },
    {
      name: "Charlie",
      avatar: "/avatar3.png",
      lastMessage: "Can you send me the file?",
    },
  ];

  const [messages, setMessages] = useState<Message[]>([
    { sender: "User 1", text: "Hello!", timestamp: "10:00 AM" },
    { sender: "User 2", text: "Hi there!", timestamp: "10:01 AM" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(
    initialContacts[0]
  );

  const handleSend = () => {
    if (newMessage.trim()) {
      const newMessageObj = {
        sender: "User 1",
        text: newMessage,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages([...messages, newMessageObj]);
      setNewMessage("");
    }
  };

  return (
    <PageContainer title="Dashboard">
      <DashboardCard title="Chat">
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            height: "calc(100vh - 135px)",
            margin: 0,
            padding: 0,
          }}
        >
          {/* Contact List */}
          <ContactList
            contacts={initialContacts}
            selectedContact={selectedContact}
            onSelectContact={setSelectedContact}
          />

          {/* Chat Container */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "70%",
              height: "100%",
              paddingLeft: 2,
            }}
          >
            {/* Chat Header */}
            <ChatHeader selectedContact={selectedContact} />

            {/* Message List */}
            <MessageList messages={messages} />

            {/* Input and Send Button */}
            <MessageInput
              newMessage={newMessage}
              onMessageChange={(e) => setNewMessage(e.target.value)}
              onSend={handleSend}
              disabled={!selectedContact}
            />
          </Box>
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
