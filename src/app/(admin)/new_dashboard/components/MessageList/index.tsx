import { Box, List, ListItem, Typography } from "@mui/material";
import { Message } from "../../types";

type Props = {
  messages: Message[];
};

const MessageList = ({ messages }: Props) => {
  return (
    <Box
      sx={{
        flex: 1,
        overflowY: "auto",
        paddingBottom: 2,
      }}
    >
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
                alignItems: msg.sender === "User 1" ? "flex-end" : "flex-start",
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
  );
};

export default MessageList;
