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
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import PageContainer from "./components/PageContainer";
import DashboardCard from "./components/Card";

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
  const [messages, setMessages] = useState<Message[]>([
    { sender: "User 1", text: "Hello!", timestamp: "10:00 AM" },
    { sender: "User 2", text: "Hi there!", timestamp: "10:01 AM" },
  ]);
  const [newMessage, setNewMessage] = useState("");

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

  const contacts: Contact[] = [
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
              {contacts.map((contact, index) => (
                <ListItem key={index} button>
                  <ListItemAvatar>
                    <Avatar src={contact.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={contact.name}
                    secondary={contact.lastMessage}
                  />
                </ListItem>
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
              />
              <IconButton color="primary" onClick={handleSend} sx={{ ml: 1 }}>
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
