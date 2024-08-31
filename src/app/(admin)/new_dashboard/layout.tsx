"use client";
import { styled, Container, Box } from "@mui/material";
import Sidebar from "./shared/sidebar/Sidebar";
import ContactSidebar from "./components/ContactSidebar";
import ChatPopup from "./components/ChatPopup";
import { useChat } from "@/app/hooks/useChat";
import { useIsDashboardPage } from "./guides/hooks/useIsDashboardPage";
import { useIsChatPopupOpen } from "./hooks/useIsChatPopupOpen";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
}));

const RightSidebarWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end", 
  gap: 2,
}));

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { selectedContact } = useChat();
  const isDashboardPage = useIsDashboardPage();
  const {isOpen ,setIsOpen} = useIsChatPopupOpen();

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
        {(isOpen || isDashboardPage) && <ContactSidebar isContactSidebarOpen={isOpen} />}
        {!isDashboardPage && <ChatPopup isOpen={isOpen} setIsOpen={setIsOpen} selectedContact={selectedContact} />}
      </RightSidebarWrapper>
    </MainWrapper>
  );
}
