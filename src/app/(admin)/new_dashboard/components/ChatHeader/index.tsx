import {
  Box,
  Typography,
  Button,
  Backdrop,
  CircularProgress,
} from "@mui/material";

import SmartToyIcon from "@mui/icons-material/SmartToy";
import DoneIcon from "@mui/icons-material/Done";
import { Contact } from "../../types";
import { useGuide } from "./hooks/useGuide";
import { useState } from "react";
import { useChat } from "./hooks/useChat";

type Props = {
  selectedContact: Contact | null;
  handleContactSelect: (contact: Contact) => void;
};

const ChatHeader = ({ selectedContact, handleContactSelect }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { handleGenerateGuide, guideError, isGuideError } = useGuide();
  const { handleCloseChat, chatError, isChatError } = useChat({
    handleContactSelect,
    selectedContact,
  });

  return (
    <>
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
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box sx={{ color: "red", height: "1.5rem" }}>
                {isGuideError && (
                  <Typography variant="subtitle1" color="red">
                    {guideError?.message}
                  </Typography>
                )}
                {isChatError && (
                  <Typography variant="subtitle1" color="red">
                    {chatError?.message}
                  </Typography>
                )}
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Button
                  variant="contained"
                  startIcon={!isLoading && <SmartToyIcon />}
                  onClick={() => {
                    handleGenerateGuide(selectedContact.chatId);
                    setIsLoading(true);
                  }}
                  disabled={isLoading}
                  sx={{ width: "163px", height: "36px", textTransform: "none" }}
                >
                  {!isLoading ? (
                    "Generate Guide"
                  ) : (
                    <CircularProgress size={20} color="inherit" />
                  )}
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<DoneIcon />}
                  sx={{ textTransform: "none" }}
                  disabled={!selectedContact.isOpen}
                  onClick={() =>
                    handleCloseChat({
                      id: selectedContact.chatId,
                      customerId: selectedContact.userId,
                    })
                  }
                >
                  Close
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default ChatHeader;
