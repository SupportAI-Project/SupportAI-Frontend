"use client";
import PageContainer from "@/components/PageContainer";
import DashboardCard from "./shared/Card";
import MessageInput from "./components/MessageInput";
import { Box } from "@mui/material";
import ContactList from "./components/ContactList";
import ChatHeader from "./components/ChatHeader";
import MessageList from "./components/MessageList";
import { useChat, useContacts } from "./hooks";
import { useSocket } from "@/hooks";

const Page = () => {
  const { contacts, selectedChat, handleChatSelect } = useContacts();
  const {
    chatMessages,
    handleSendMessage,
    newMessage,
    handleChange,
    isNote,
    handleChangeNote,
  } = useChat(selectedChat?.chatId || null);
  useSocket();
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
            chats={contacts}
            selectedChat={selectedChat}
            onSelectChat={handleChatSelect}
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
            <ChatHeader selectedContact={selectedChat} />

            {/* Message List */}
            <MessageList messages={chatMessages} />

            {/* Input and Send Button */}
            <MessageInput
              newMessage={newMessage}
              onMessageChange={handleChange}
              handleChangeNote={handleChangeNote}
              isNote={isNote}
              onSend={() => selectedChat && handleSendMessage()}
              disabled={!selectedChat}
            />
          </Box>
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
