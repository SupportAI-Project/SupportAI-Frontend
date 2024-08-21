import { Box, List } from "@mui/material";
import { useSocket } from "@/app/hooks/useSocket";
import { useMessageList } from "@/common/hooks/useMessageList";
import { Message } from "@/common";
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
          return <Message message={msg} key={index}></Message>;
        })}
      </List>
    </Box>
  );
};

export default SupportMessageList;
