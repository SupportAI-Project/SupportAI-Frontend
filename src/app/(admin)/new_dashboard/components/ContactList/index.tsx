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
  contacts: Chat[];
  selectedContact: Chat | null;
  onSelectContact: (chat: Chat) => void;
};

const ContactList = ({ contacts, onSelectContact, selectedContact }: Props) => {
  return (
    <Box
      sx={{
        width: "30%",
        borderRight: "1px solid #e0e0e0",
        overflow: "hidden",
      }}
    >
      <List>
        {contacts.length === 0 ? (
          <Box sx={{ padding: "16px", textAlign: "center", color: "#888" }}>
            No chats yet!
          </Box>
        ) : (
          <List>
            {contacts.map((contact, index) => (
              <Box key={index} sx={{ padding: "0 8px" }}>
                <ListItemButton
                  selected={
                    selectedContact?.user?.userId === contact.user?.userId
                  }
                  onClick={() => onSelectContact(contact)}
                  sx={{
                    backgroundColor:
                      selectedContact?.user?.userId === contact.user?.userId
                        ? "#f5f5f5"
                        : "#ffffff",
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
                    primary={contact.user?.username}
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
