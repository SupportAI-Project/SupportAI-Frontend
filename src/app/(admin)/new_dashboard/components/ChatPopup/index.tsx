"use client";

import React, { useState } from "react";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import { Chat, Close } from "@mui/icons-material";
import SupportMessageList from "../SupportMessageList";
import MessageInput from "@/common/components/MessageInput";
import { Contact } from "../../types";

interface Props {
  selectedContact: Contact | null;
}

const ChatPopup = ({ selectedContact }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        right: 0,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        padding: 2,
        boxSizing: "border-box",
        zIndex: 1000,
      }}
    >
      <IconButton
        color="primary"
        onClick={toggleChat}
        sx={{
          backgroundColor: "primary.main",
          color: "white",
          "&:hover": { backgroundColor: "primary.dark" },
        }}
      >
        {isOpen ? <Close /> : <Chat />}
      </IconButton>

      {isOpen && selectedContact && (
        <Paper
          elevation={6}
          sx={{
            width: 400,
            height: 500,
            display: "flex",
            flexDirection: "column",
            marginLeft: 2,
            backgroundColor: "background.paper",
            boxShadow: 1,
            borderRadius: 1,
            overflow: "hidden",
            zIndex: 1000,
          }}
        >
          <Box
            sx={{
              backgroundColor: "primary.main",
              color: "white",
              padding: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">{selectedContact.username}</Typography>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              padding: 2,
              overflowY: "auto",
              backgroundColor: "background.default",
            }}
          >
            <SupportMessageList
              chatId={selectedContact.chatId}
              username={selectedContact.username}
            />
          </Box>

          {/* Input and Send Button */}
          {selectedContact && selectedContact.isOpen && (
            <Box>
              <MessageInput chatId={selectedContact.chatId} isPopup={true} />
            </Box>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default ChatPopup;
