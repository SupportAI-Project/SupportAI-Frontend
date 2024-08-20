"use client";
import PageContainer from "@/components/PageContainer";
import DashboardCard from "./shared/Card";
import MessageInput from "./components/MessageInput";
import { Box } from "@mui/material";
import ContactList from "./components/ContactList";
import ChatHeader from "./components/ChatHeader";
import MessageList from "./components/MessageList";
import { useContacts } from "./hooks";
import { useSelectedContact } from "./hooks/useSelectedContact";
import { useSocket } from "@/app/hooks/useSocket";

const Page = () => {
  const socket = useSocket();
  const { selectedContact, handleContactSelect } = useSelectedContact({
    socket,
  });
  const { contacts } = useContacts({
    socket,
    handleContactSelect,
  });

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
            onSelectContact={handleContactSelect}
          />

          {/* Chat Container */}
          {selectedContact && (
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
              {selectedContact && (
                <ChatHeader selectedContact={selectedContact} />
              )}

              {/* Message List */}
              {selectedContact && (
                <MessageList
                  // messages={contactMessages}
                  chatId={selectedContact.chatId}
                />
              )}

              {/* Input and Send Button */}
              {selectedContact && (
                <MessageInput chatId={selectedContact.chatId} />
              )}
            </Box>
          )}
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
