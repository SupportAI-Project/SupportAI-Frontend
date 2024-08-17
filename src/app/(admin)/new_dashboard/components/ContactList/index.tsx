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
  onSelectContact: (contact: Contact) => void;
};

const ContactList = ({ contacts, selectedContact, onSelectContact }: Props) => {
  return (
    <Box
      sx={{
        width: "30%",
        borderRight: "1px solid #e0e0e0",
        overflow: "hidden",
      }}
    >
      <List>
        {contacts.map((contact, index) => (
          <Box key={index} sx={{ padding: "0 8px" }}>
            <ListItemButton
              selected={selectedContact?.name === contact.name}
              onClick={() => onSelectContact(contact)}
              sx={{
                backgroundColor:
                  selectedContact?.name === contact.name
                    ? "#f5f5f5"
                    : "inherit",
                borderRadius: 0,
                marginRight: 0,
              }}
            >
              <ListItemAvatar>
                <Avatar src={contact.avatar} />
              </ListItemAvatar>
              <ListItemText
                primary={contact.name}
                secondary={contact.lastMessage}
              />
            </ListItemButton>
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default ContactList;
