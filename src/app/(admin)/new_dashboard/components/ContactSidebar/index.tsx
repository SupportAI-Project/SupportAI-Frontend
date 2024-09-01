"use client";
import {
    Box,
    Drawer,
    List,
    ListItemButton,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Typography,
    Slide,
  } from "@mui/material";
  import { Contact } from "../../types";
  import { useChat } from "@/app/hooks/useChat";
  
  interface Props {
    isContactSidebarOpen: boolean;
  }
  
  const ContactSidebar = ({ isContactSidebarOpen }: Props) => {
    const sidebarWidth = "230px";
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
      <Slide direction="left" in={isContactSidebarOpen} mountOnEnter unmountOnExit>
      <Box
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
          whiteSpace: "nowrap",
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
              backgroundColor: "paper",
              padding: "20px",
            },
          }}
        >
          <List>
            <Typography variant="h4" mb={4}>Open chats</Typography>
            {contacts.length === 0 ? (
              <Box sx={{ padding: "16px", textAlign: "center", color: "text.primary" }}>
                No chats yet!
              </Box>
            ) : (
              contacts.map((contact, index) => (
                <Box key={index} >
                  <ListItemButton
                    selected={selectedContact?.chatId === contact.chatId}
                    onClick={() => handleContactSelect(contact)}
                    sx={{
                      borderRadius: 2,
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
      </Slide>
    );
  };
  
  export default ContactSidebar;
  