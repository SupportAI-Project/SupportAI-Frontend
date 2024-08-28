import { ListItem, Box, Typography } from "@mui/material";
import { Message as MessageType } from "@/api/types/message";
import { use } from "react";

type Props = {
  message: MessageType;
  isSupport?: boolean;
  username?: string;
};

export const MessageContainer = (messageProps: Props) => {
  const { username, message, isSupport = true } = messageProps;
  const { isNote, isSupportSender, timeStamp, content } = message;
  const chatMode = isSupport ? isSupportSender : !isSupportSender;
  return (
    <ListItem
      sx={{
        display: "flex",
        justifyContent: chatMode ? "flex-end" : "flex-start",
        mb: 1,
        alignItems: "flex-start",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: chatMode ? "flex-end" : "flex-start",
          backgroundColor: chatMode
            ? !isNote
              ? (theme) => theme.palette.lightBlue.main
              : (theme) => theme.palette.note.main
            : (theme) => theme.palette.lightGrey.main,
          borderRadius: 2,
          padding: 1,
          maxWidth: "70%",
          wordWrap: "break-word",
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            whiteSpace: "pre-line",
            wordWrap: "break-word",
            alignSelf: "flex-start",
            marginBottom: 0.5,
          }}
        >
          {isSupport
            ? !isSupportSender
              ? username
              : ""
            : isSupportSender
            ? "Support"
            : ""}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            whiteSpace: "pre-line",
            wordWrap: "break-word",
            alignSelf: "flex-start",
            marginBottom: 1,
          }}
        >
          {content}
        </Typography>
        <Typography
          variant="body2"
          color={(theme) => theme.palette.lightGrey.light}
          sx={{
            alignSelf: chatMode ? "flex-end" : "flex-start",
          }}
        >
          {new Date(timeStamp).toLocaleTimeString("il-IL", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </Typography>
      </Box>
    </ListItem>
  );
};
