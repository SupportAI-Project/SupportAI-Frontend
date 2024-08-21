import { Box, Typography, Button } from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import SnoozeIcon from "@mui/icons-material/Snooze";
import { Contact } from "../../types";
import convo from "./convo.json"

type Props = {
  selectedContact: Contact | null;
};

const fetchChatData = async (chatId: string) => {
  try{

    let chatResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/chats/${chatId}`,{
      method: "GET",
      credentials: "include",
    });
    if (!chatResponse.ok) {
      throw new Error("Failed to fetch chat data");
    }
    const chatData = await chatResponse.json();
    console.log(`fetchChatData chatData: `, chatData);


    let response = await fetch(`${process.env.NEXT_PUBLIC_MODEL_AI_URL}/openai/generate-guide`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        convo: chatData,
      }),
      credentials: "include",
    });

    console.log(`fetchChatData response: `, response);
    const data = await response.text();
    return data;
  } catch (error: any) {
    console.error("Error:", error.message);
  }
};

const ChatHeader = ({ selectedContact }: Props) => {
  const handleGenerateGuide = async ()  => {
    console.log("Generate Guide");
    if (selectedContact) {
      try{
        const data = await fetchChatData("1");
      } catch (error) {
        console.error("Error:", error);
      }
    };
  };

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
          <Typography variant="h6">{selectedContact.name}</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button variant="contained" startIcon={<SmartToyIcon />} onClick={handleGenerateGuide}>
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
