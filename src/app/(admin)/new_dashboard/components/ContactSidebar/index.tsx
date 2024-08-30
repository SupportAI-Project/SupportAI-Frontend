"use client";
import {
    Box,
    Drawer,
    List,
    ListItemButton,
    ListItemAvatar,
    Avatar,
    ListItemText,
  } from "@mui/material";
  import { Contact } from "../../types";
  import { useChat } from "@/app/hooks/useChat";
  
  interface Props {
    isContactSidebarOpen: boolean;
  }
  
  const ContactSidebar = ({ isContactSidebarOpen }: Props) => {
    const sidebarWidth = "270px";
    const { selectedContact, contacts, handleContactSelect } = useChat();
  
    const scrollbarStyles = {
      "&::-webkit-scrollbar": {
        width: "7px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "primary.main",
        borderRadius: "15px",
      },
    };
  
    return (
      <Box
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
        }}
      >
        <Drawer
          anchor="right"
          open={isContactSidebarOpen}
          variant="permanent"
          PaperProps={{
            sx: {
              boxSizing: "border-box",
              ...scrollbarStyles,
              width: sidebarWidth,
              backgroundColor: "primary.light",
            },
          }}
        >
          <List>
            {contacts.length === 0 ? (
              <Box sx={{ padding: "16px", textAlign: "center", color: "#883434" }}>
                No chats yet!
              </Box>
            ) : (
              contacts.map((contact, index) => (
                <Box key={index} sx={{ padding: "8px 0" }}>
                  <ListItemButton
                    selected={selectedContact?.chatId === contact.chatId}
                    onClick={() => handleContactSelect(contact)}
                    sx={{
                      backgroundColor:
                        selectedContact?.chatId === contact.chatId
                          ? "primary.main"
                          : "primary.light",
                      borderRadius: 1,
                      marginRight: 0,
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        src={"https://bootdey.com/img/Content/avatar/avatar2.png"} 
                      />
                    </ListItemAvatar>
                    <ListItemText primary={contact.username} />
                  </ListItemButton>
                </Box>
              ))
            )}
          </List>
        </Drawer>
      </Box>
    );
  };
  
  export default ContactSidebar;
  