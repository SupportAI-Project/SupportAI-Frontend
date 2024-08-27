import { Box, Typography, Button } from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import SnoozeIcon from "@mui/icons-material/Snooze";
import { Contact } from "../../types";
import { useGuide } from "./hooks/useGuide";

type Props = {
  selectedContact: Contact | null;
};

const ChatHeader = ({ selectedContact }: Props) => {
  const { handleGenerateGuide } = useGuide();
  return (
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
      {selectedContact && (
        <>
          <Typography variant="h6">{selectedContact.username}</Typography>
          <Box
            onClick={() => handleGenerateGuide(selectedContact.chatId)}
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
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
        </>
      )}
    </Box>
  );
};

export default ChatHeader;
