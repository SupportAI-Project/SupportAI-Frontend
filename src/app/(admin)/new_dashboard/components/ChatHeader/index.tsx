import { Box, Typography, Button } from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import SnoozeIcon from "@mui/icons-material/Snooze";
import { Chat } from "@/types";

type Props = {
  selectedContact: Chat | null;
};

const ChatHeader = ({ selectedContact }: Props) => {
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
          <Typography variant="h6">{selectedContact.user?.username}</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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
