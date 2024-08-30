import {
  Box,
  List,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import { Contact } from "../../types";

type Props = {
  contacts: Contact[];
  selectedContact: Contact | null;
  onSelectContact: (chat: Contact) => void;
};

const ContactList = ({ contacts, onSelectContact, selectedContact }: Props) => {
  return (
    <Box
      sx={{
        width: "20%",
        borderRight: "1px solid #E0E0E0",
        overflow: "auto",
        padding: 2,
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
              <Box key={index} sx={{ padding: "8px 0" }}>
                <ListItemButton
                  selected={selectedContact?.chatId === contact.chatId}
                  onClick={() => onSelectContact(contact)}
                  sx={{
                    backgroundColor:
                      selectedContact?.chatId === contact.chatId
                        ? "primary.main"
                        : "primary.light",
                    borderRadius: 1,
                    marginLeft: 0, 
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      src={"https://bootdey.com/img/Content/avatar/avatar2.png"} // Maybe add later avatars to users
                    />
                  </ListItemAvatar>
                  <ListItemText primary={contact.username} />
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
