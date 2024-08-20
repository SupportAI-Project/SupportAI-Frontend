import { Box, List, ListItem, Typography } from "@mui/material";
import { useMessageList } from "./hooks/useMessageList";

import { useSocket } from "@/app/hooks/useSocket";
type Props = {
  chatId: number;
};

const MessageList = ({ chatId }: Props) => {
  const socket = useSocket();
  const { messages } = useMessageList({ chatId, socket });

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
              justifyContent: msg.isSupportSender ? "flex-end" : "flex-start",
              mb: 1,
              alignItems: "flex-start",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: msg.isSupportSender ? "flex-end" : "flex-start",
                backgroundColor: msg.isSupportSender
                  ? !msg.isNote
                    ? "lightblue"
                    : (theme) => theme.palette.note.main
                  : "lightgray",
                borderRadius: 2,
                padding: 1,
                maxWidth: "70%",
                wordWrap: "break-word",
              }}
            >
              <Typography variant="body2" color="textSecondary">
                {msg.isSupportSender ? "Support" : "User"} •{" "}
                {new Date(msg.timeStamp).toLocaleTimeString("il-IL", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                  month: "2-digit",
                  day: "2-digit",
                })}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  whiteSpace: "pre-line",
                  wordWrap: "break-word",
                  alignSelf: "flex-start",
                }}
              >
                {msg.content}
              </Typography>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default MessageList;
