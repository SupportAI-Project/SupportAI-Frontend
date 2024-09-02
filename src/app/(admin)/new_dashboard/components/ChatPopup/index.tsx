"use client";

import React, { useState } from "react";
import { Box, IconButton, Paper, Typography, Slide } from "@mui/material";
import { Chat, Minimize } from "@mui/icons-material";
import SupportMessageList from "../SupportMessageList";
import MessageInput from "@/common/components/MessageInput";
import { Contact } from "../../types";

interface Props {
  selectedContact: Contact | null;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ChatPopup = ({ selectedContact, setIsOpen, isOpen }: Props) => {
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 20,
        right: isOpen ? 270 : 30,
        zIndex: 1500,
      }}
    >
      {!isOpen && (
        <IconButton
          color="primary"
          onClick={toggleChat}
          sx={{
            backgroundColor: "primary.main",
            color: "white",
            "&:hover": { backgroundColor: "primary.dark" },
          }}
        >
          <Chat />
        </IconButton>
      )}

      {isOpen && selectedContact && (
        <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
          <Paper
            elevation={6}
            sx={{
              width: 400,
              height: 500,
              display: "flex",
              flexDirection: "column",
              backgroundColor: "background.paper",
              boxShadow: 1,
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                backgroundColor: "primary.main",
                color: "info.contrastText",
                padding: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <IconButton
                onClick={toggleChat}
                sx={{ color: "info.contrastText", mb: 1 }}
              >
                <Minimize />
              </IconButton>
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
        </Slide>
      )}
    </Box>
  );
};

export default ChatPopup;
