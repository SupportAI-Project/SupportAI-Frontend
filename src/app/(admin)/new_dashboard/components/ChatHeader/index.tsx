import { Box, Typography, Button } from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import DoneIcon from "@mui/icons-material/Done";
import { Contact } from "../../types";
import { useGuide } from "./hooks/useGuide";

type Props = {
  selectedContact: Contact | null;
  handleContactSelect: (contact: Contact) => void;
};

const ChatHeader = ({ selectedContact, handleContactSelect }: Props) => {
  const { handleGenerateGuide, handleCloseChat } = useGuide({
    handleContactSelect,
    selectedContact,
  });
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
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button
              variant="contained"
              startIcon={<SmartToyIcon />}
              onClick={() => handleGenerateGuide(selectedContact.chatId)}
            >
              Generate Guide
            </Button>

            <Button
              variant="outlined"
              startIcon={<DoneIcon />}
              sx={{ textTransform: "none" }}
              disabled={!selectedContact.isOpen}
              onClick={() => handleCloseChat(selectedContact.chatId)}
            >
              Close
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ChatHeader;
