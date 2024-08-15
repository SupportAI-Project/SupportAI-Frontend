"use client";
import {
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
  TextField,
  IconButton,
  Divider,
  Avatar,
  ListItemAvatar,
  Button,
  ListItemButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SnoozeIcon from "@mui/icons-material/Snooze";
import { useState } from "react";
import PageContainer from "./components/PageContainer";
import DashboardCard from "./components/Card";
import SmartToyIcon from "@mui/icons-material/SmartToy";

type Message = {
  sender: string;
  text: string;
  timestamp: string;
};

type Contact = {
  name: string;
  avatar: string;
  lastMessage: string;
};

const Page = () => {
  const initialContacts: Contact[] = [
    {
      name: "Alice",
      avatar: "/avatar1.png",
      lastMessage: "See you later!",
    },
    {
      name: "Bob",
      avatar: "/avatar2.png",
      lastMessage: "Let's catch up tomorrow.",
    },
    {
      name: "Charlie",
      avatar: "/avatar3.png",
      lastMessage: "Can you send me the file?",
    },
  ];

  // Automatically select the first contact (Alice) when the page loads
  const [messages, setMessages] = useState<Message[]>([
    { sender: "User 1", text: "Hello!", timestamp: "10:00 AM" },
    { sender: "User 2", text: "Hi there!", timestamp: "10:01 AM" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(
    initialContacts[0]
  );

  const handleSend = () => {
    if (newMessage.trim()) {
      const newMessageObj = {
        sender: "User 1",
        text: newMessage,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages([...messages, newMessageObj]);
      setNewMessage("");
    }
  };

  return (
    <PageContainer title="Dashboard">
      <DashboardCard title="Chat">
        <Paper
          elevation={3}
          sx={{
            maxWidth: 1200,
            margin: "auto",
            padding: 2,
            display: "flex",
            flexDirection: "row",
            height: "500px",
          }}
        >
          {/* Contact List */}
          <Box
            sx={{
              width: "30%",
              borderRight: "1px solid #e0e0e0",
              paddingRight: 2,
            }}
          >
            <List>
              {initialContacts.map((contact, index) => (
                <ListItemButton
                  key={index}
                  selected={selectedContact?.name === contact.name}
                  onClick={() => setSelectedContact(contact)}
                  sx={{
                    backgroundColor:
                      selectedContact?.name === contact.name
                        ? "#f5f5f5"
                        : "inherit",
                  }}
                >
                  <ListItemAvatar>
                    <Avatar src={contact.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={contact.name}
                    secondary={contact.lastMessage}
                  />
                </ListItemButton>
              ))}
            </List>
          </Box>

          {/* Chat Container */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              width: "70%",
              paddingLeft: 2,
            }}
          >
            {/* Chat Header */}
            {selectedContact && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingBottom: 1,
                  marginBottom: 2,
                  borderBottom: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Typography variant="h6">{selectedContact.name}</Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Button variant="contained" startIcon={<SmartToyIcon />}>
                    Generate Guide
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<SnoozeIcon />}
                    sx={{ textTransform: "none" }}
                  >
                    Snooze
                  </Button>
                </Box>
              </Box>
            )}

            {/* Message List */}
            <Box sx={{ flex: 1, overflowY: "auto", paddingBottom: 2 }}>
              <List>
                {messages.map((msg, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent:
                        msg.sender === "User 1" ? "flex-end" : "flex-start",
                      mb: 1,
                      alignItems: "flex-start",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems:
                          msg.sender === "User 1" ? "flex-end" : "flex-start",
                        backgroundColor:
                          msg.sender === "User 1" ? "lightblue" : "lightgray",
                        borderRadius: 2,
                        padding: 1,
                        maxWidth: "70%",
                        wordWrap: "break-word",
                      }}
                    >
                      <Typography variant="body2" color="textSecondary">
                        {msg.sender} • {msg.timestamp}
                      </Typography>
                      <Typography variant="body1">{msg.text}</Typography>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Box>
            <Divider />
            {/* Input and Send Button */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                paddingTop: 1,
                position: "sticky",
                bottom: 0,
                backgroundColor: "background.paper",
              }}
            >
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                disabled={!selectedContact}
              />
              <IconButton
                color="primary"
                onClick={handleSend}
                sx={{ ml: 1 }}
                disabled={!selectedContact}
              >
                <SendIcon />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
