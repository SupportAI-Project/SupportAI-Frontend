import { Box, List } from "@mui/material";
import { useSocket } from "@/app/hooks/useSocket";
import { useMessageList } from "@/common/hooks/useMessageList";
import { MessageContainer } from "@/common";
type Props = {
  chatId: number;
};

const SupportMessageList = ({ chatId }: Props) => {
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
        {messages.map((msg, index) => {
          return (
            <MessageContainer message={msg} key={index}></MessageContainer>
          );
        })}
      </List>
      
    </Box>
  );
};

export default SupportMessageList;
