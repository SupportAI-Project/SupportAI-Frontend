"use client";
import { Container, Box } from "@mui/material";
import Sidebar from "./shared/sidebar/Sidebar";
import ContactSidebar from "./components/ContactSidebar";
import ChatPopup from "./components/ChatPopup";
import { useChat } from "@/app/hooks/useChat";
import { useIsDashboardPage } from "./guides/hooks/useIsDashboardPage";
import { useIsChatPopupOpen } from "./hooks/useIsChatPopupOpen";
import { useIsCreateGuidePage } from "./guides/hooks/useIsCreateGuidePage";
import {
  LeftSidebarWrapper,
  RightSidebarWrapper,
  PageWrapper,
  MainWrapper,
} from "@/app/wrappers/wrappers";
import ContactList from "./components/ContactList";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { selectedContact } = useChat();
  const isDashboardPage = useIsDashboardPage();
  const isCreateGuidePage = useIsCreateGuidePage();
  const { isOpen, setIsOpen } = useIsChatPopupOpen();

  return (
    <MainWrapper className="mainwrapper">
      <Sidebar isSidebarOpen={true} />

      <PageWrapper className="page-wrapper">
        <Container
          maxWidth={false}
          sx={{
            paddingTop: "20px",
          }}
        >
          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
        </Container>
      </PageWrapper>

      <RightSidebarWrapper>
        {(isOpen || isDashboardPage) && (
          <ContactSidebar
            isContactSidebarOpen={isDashboardPage ? true : isOpen}
          />
        )}
        {!isDashboardPage && !isCreateGuidePage && (
          <ChatPopup
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            selectedContact={selectedContact}
          />
        )}
      </RightSidebarWrapper>
    </MainWrapper>
  );
}
