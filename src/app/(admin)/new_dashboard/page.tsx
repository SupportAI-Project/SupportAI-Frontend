"use client";
import PageContainer from "@/components/PageContainer";
import DashboardCard from "./shared/Card";
import { Box } from "@mui/material";
import ContactList from "./components/ContactList";
import ChatHeader from "./components/ChatHeader";
import SupportMessageList from "./components/SupportMessageList";
import MessageInput from "@/common/components/MessageInput";
import { useGlobalChat } from "@/app/hooks/useGlobalContacts";

const Page = () => {

 const {selectedContact, handleContactSelect, contacts} = useGlobalChat();
 
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
                <SupportMessageList chatId={selectedContact.chatId} />
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
