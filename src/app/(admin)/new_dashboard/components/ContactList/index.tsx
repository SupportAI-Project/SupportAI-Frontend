import {
  Box,
  List,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import { Chat } from "@/types";

type Props = {
  chats: Chat[];
  selectedChat: Chat | null;
  onSelectChat: (chat: Chat) => void;
};

const ContactList = ({ chats, selectedChat, onSelectChat }: Props) => {
  return (
    <Box
      sx={{
        width: "30%",
        borderRight: "1px solid #e0e0e0",
        overflow: "hidden",
      }}
    >
      <List>
        {chats.length === 0 ? (
          <Box sx={{ padding: "16px", textAlign: "center", color: "#888" }}>
            No chats yet!
          </Box>
        ) : (
          <List>
            {chats.map((chat, index) => (
              <Box key={index} sx={{ padding: "0 8px" }}>
                <ListItemButton
                  selected={
                    selectedChat?.user?.username === chat.user?.username
                  }
                  onClick={() => onSelectChat(chat)}
                  sx={{
                    backgroundColor:
                      selectedChat?.user?.username === chat.user?.username
                        ? "#f5f5f5"
                        : "inherit",
                    borderRadius: 0,
                    marginRight: 0,
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      src={"https://bootdey.com/img/Content/avatar/avatar2.png"} // Maybe add later avatars to users
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={chat.user?.username}
                    // secondary={chat.}
                  />
                </ListItemButton>
              </Box>
            ))}
          </List>
        )}
      </List>
    </Box>
  );
};

export default ContactList;
