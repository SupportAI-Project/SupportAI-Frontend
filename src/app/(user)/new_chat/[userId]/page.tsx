"use client";
import PageContainer from "@/components/PageContainer";
import { Box, Card } from "@mui/material";
import { useChat } from "./hooks";
import { useParams } from "next/navigation";
import { useSocket } from "@/app/hooks/useSocket";
import MessageInput from "@/common/components/MessageInput";
import UserMessageList from "./components/UserMessageList";

const ChatPage = () => {
  const { userId } = useParams<{ userId: string }>()!;
  const { chatId, error } = useChat({
    userId: parseInt(userId),
    socket: useSocket(),
  });

  return (
    <PageContainer title="Chat">
      <Card
        sx={{
          padding: 0,
          height: "auto",
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          border: 0,
          boxShadow: 0,
          flex: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "calc(100vh - 135px)",
            width: "70%",
            boxShadow: "0px 0px 0px 0.5px rgba(0, 0, 0, 0.1)",
            margin: 0,
            padding: 0,
          }}
        >
          {chatId ? (
            <>
              <UserMessageList chatId={chatId} />
              <MessageInput isSupport={false} chatId={chatId} />
            </>
          ) : null}
          {error ? <p>{error.message}</p> : null}
        </Box>
      </Card>
    </PageContainer>
  );
};
export default ChatPage;
