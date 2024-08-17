"use client";
import { useState } from "react";
import PageContainer from "@/components/PageContainer";
import DashboardCard from "./shared/Card";
import MessageInput from "./components/MessageInput";
import { Box } from "@mui/material";
import ContactList from "./components/ContactList";
import ChatHeader from "./components/ChatHeader";
import MessageList from "./components/MessageList";
import { Contact } from "./types";
import { useChat, useContacts } from "./hooks";

const Page = () => {
  const { contacts } = useContacts();
  const { messages, newMessage, handleChange, handleSend } = useChat();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(
    contacts[0]
  );

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
            contacts={contacts}
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
              onMessageChange={handleChange}
              onSend={() => selectedContact && handleSend("User 1")}
              disabled={!selectedContact}
            />
          </Box>
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
