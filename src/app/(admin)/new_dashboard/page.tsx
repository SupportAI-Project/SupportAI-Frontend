"use client";
import PageContainer from "@/components/PageContainer";
import DashboardCard from "./shared/Card";
import { Box } from "@mui/material";
import ContactList from "./components/ContactList";
import ChatHeader from "./components/ChatHeader";
import { useContacts } from "./hooks";
import { useSocket } from "@/app/hooks/useSocket";
import SupportMessageList from "./components/SupportMessageList";
import MessageInput from "@/common/components/MessageInput";

const Page = () => {
  const socket = useSocket();
  const { contacts, selectedContact, handleContactSelect } = useContacts({
    socket,
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
                <ChatHeader
                  selectedContact={selectedContact}
                  handleContactSelect={handleContactSelect}
                />
              )}

              {/* Message List */}
              {selectedContact && (
                <SupportMessageList chatId={selectedContact.chatId} />
              )}

              {/* Input and Send Button */}
              {selectedContact && selectedContact.isOpen && (
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
