import {
  Box,
  List,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import { Contact } from "../../types";
import ContactCard from "../ContactCard";

type Props = {
  contacts: Contact[];
  selectedContact: Contact | null;
  onSelectContact: (chat: Contact) => void;
};

const ContactList = ({ contacts, onSelectContact, selectedContact }: Props) => {
  return (
    <Box
      sx={{
        width: "30%",
        borderRight: "1px solid #e0e0e0",
        overflow: "auto",
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
              <ContactCard
                key={index}
                contact={contact}
                selected={selectedContact?.chatId === contact.chatId}
                onSelect={onSelectContact}
              />
            ))}
          </List>
        )}
      </List>
    </Box>
  );
};

export default ContactList;
