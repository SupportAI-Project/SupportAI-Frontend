import { Box, List } from "@mui/material";
import { useSocket } from "@/app/hooks/useSocket";
import { useMessageList } from "@/common/hooks/useMessageList";
import { MessageContainer } from "@/common";
type Props = {
  chatId: number;
  username: string;
};

const SupportMessageList = ({ chatId, username }: Props) => {
  const socket = useSocket();
  const { messages } = useMessageList({ chatId, socket });

  return (
    <Box
      sx={{
        flex: 1,
        overflowY: "auto",
        paddingBottom: 2,
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    >
      <List>
        {Object.keys(messages).map((date, index) => {
          return (
            <Box key={index}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 1,
                }}
              >
                {date}
              </Box>
              {messages[date].map((msg, index) => {
                return (
                  <MessageContainer
                    message={msg}
                    key={index}
                    username={username}
                  ></MessageContainer>
                );
              })}
            </Box>
          );
        })}
      </List>
    </Box>
  );
};

export default SupportMessageList;
