import { Box, List } from "@mui/material";
import { useSocket } from "@/app/hooks/useSocket";
import { useMessageList } from "@/common/hooks/useMessageList";
import { MessageContainer } from "@/common";

type Props = {
  chatId: number;
};

const UserMessageList = ({ chatId }: Props) => {
  const socket = useSocket();
  const { messages } = useMessageList({ chatId, socket });

  return (
    <Box
      sx={{
        flex: 1,
        overflowY: "auto",
        paddingBottom: 2,
      }}
    >
      <List>
        {messages &&
          Object.keys(messages).map((date, index) => {
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
                  if (msg.isNote) return null;
                  return (
                    <MessageContainer
                      message={msg}
                      key={index}
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

export default UserMessageList;
