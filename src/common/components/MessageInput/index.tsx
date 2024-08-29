import { Box, TextField, IconButton, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useMessage } from "./hooks/useMessage";
import { useSocket } from "@/app/hooks/useSocket";

type MessageInputProps = {
  chatId: number;
  isSupport?: boolean;
  isPopup?: boolean;
};

const MessageInput = ({ chatId, isSupport = true , isPopup = false }: MessageInputProps) => {
  const socket = useSocket();

  const { errors, handleChangeNote, handleSubmit, isNote, register } =
    useMessage({ chatId, socket, isSupport });

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
      {isSupport && (
        <Box sx={{ display: "flex", alignSelf: "start", gap: 1 }}>
          <Button
            color="note"
            variant={isNote ? "contained" : "outlined"}
            onClick={handleChangeNote}
            sx={{
              color: isNote ? "inherit" : "rgba(0, 0, 0, 0.38)", 
              borderColor: isNote ? "inherit" : "rgba(0, 0, 0, 0.38)",}}
          >
            Note
          </Button>
        </Box>
      )}

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
          id="message"
          autoComplete="message"
          autoFocus
          {...register("message")}
          multiline
          minRows={isPopup ? 2 : 5}
          maxRows={10}
          InputProps={{
            style: { overflow: "hidden" },
          }}
          error={!!errors.message}
          helperText={errors.message ? errors.message.message : ""}
        />
        <IconButton color="primary" onClick={handleSubmit} sx={{ ml: 1 }}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default MessageInput;
