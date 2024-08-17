import { Box, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

type Props = {
  newMessage: string;
  onMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
  disabled: boolean;
};

const MessageInput = ({
  newMessage,
  onMessageChange,
  onSend,
  disabled,
}: Props) => {
  return (
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
        onChange={onMessageChange}
        disabled={disabled}
      />
      <IconButton
        color="primary"
        onClick={onSend}
        sx={{ ml: 1 }}
        disabled={disabled}
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default MessageInput;
