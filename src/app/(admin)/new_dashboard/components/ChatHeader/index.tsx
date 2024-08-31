import {
  Box,
  Typography,
  Button,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import SnoozeIcon from "@mui/icons-material/Snooze";
import { Contact } from "../../types";
import { useGuide } from "./hooks/useGuide";
import { useState } from "react";

type Props = {
  selectedContact: Contact | null;
};

const ChatHeader = ({ selectedContact }: Props) => {
  const { handleGenerateGuide } = useGuide();
  const [isLoading, setIsLoading] = useState(false);

  const handleClicked = (selectedContact: Contact) => {
    setIsLoading(true);
    handleGenerateGuide(selectedContact.chatId);
  };

  return (
    <>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
        {}
        {selectedContact && (
          <>
            <Typography variant="h6">{selectedContact.username}</Typography>
            <Box
              onClick={() => handleClicked(selectedContact)}
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
    </>
  );
};

export default ChatHeader;
