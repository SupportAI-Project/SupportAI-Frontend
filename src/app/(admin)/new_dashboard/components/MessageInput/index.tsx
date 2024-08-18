import {
  Box,
  TextField,
  IconButton,
  TextareaAutosize,
  Button,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

type Props = {
  newMessage: string;
  onMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
  disabled: boolean;
  isNote: boolean;
  handleChangeNote: () => void;
};

const MessageInput = ({
  newMessage,
  onMessageChange,
  isNote,
  handleChangeNote,
  onSend,
  disabled,
}: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: 1,
        position: "sticky",
        bottom: 0,
        backgroundColor: "background.paper",
      }}
    >
      <Box sx={{ display: "flex", alignSelf: "start", gap: 1 }}>
        <Button
          variant={!isNote ? "contained" : "outlined"}
          onClick={isNote ? handleChangeNote : () => {}}
        >
          Reply
        </Button>
        <Button
          variant={isNote ? "contained" : "outlined"}
          onClick={!isNote ? handleChangeNote : () => {}}
        >
          Note
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "end",
          flexDirection: "row",
          paddingTop: 1,
          width: "100%",
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
          multiline
          minRows={5}
          maxRows={10}
          InputProps={{
            style: { overflow: "hidden" },
          }}
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
    </Box>
  );
};

export default MessageInput;
