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
  Grid,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import PageContainer from "./components/PageContainer";

const Page = () => {
  const [messages, setMessages] = useState([
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

  return (
    <PageContainer title="Dashboard">
      <Paper elevation={3} sx={{ maxWidth: 600, margin: "auto", padding: 2 }}>
        <Grid container direction="column" sx={{ height: "500px" }}>
          {/* Message List */}
          <Grid item xs={10} sx={{ overflowY: "auto" }}>
            <List>
              {messages.map((msg, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={
                      <Box>
                        <Typography variant="body2" color="textSecondary">
                          {msg.sender} • {msg.timestamp}
                        </Typography>
                        <Typography variant="body1">{msg.text}</Typography>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Divider />
          {/* Input and Send Button */}
          <Grid item xs={2}>
            <Box display="flex" alignItems="center" mt={1}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <IconButton color="primary" onClick={handleSend}>
                <SendIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </PageContainer>
  );
};

export default Page;
