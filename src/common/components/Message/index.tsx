import { ListItem, Box, Typography } from "@mui/material";

type IMessage = {
  message: Message;
  isSupport?: boolean;
};

export const Message = (messageProps: IMessage) => {
  const { message, isSupport = true } = messageProps;
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
          {isSupportSender ? "Support" : "User"} •{" "}
          {new Date(timeStamp).toLocaleTimeString("il-IL", {
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
          {content}
        </Typography>
      </Box>
    </ListItem>
  );
};
