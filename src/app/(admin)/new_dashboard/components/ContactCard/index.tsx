import React from "react";
import {
  Box,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import { Contact } from "../../types";

interface ContactCardProps {
  contact: Contact;
  selected: boolean;
  onSelect: (contact: Contact) => void;
}

const ContactCard: React.FC<ContactCardProps> = ({
  contact,
  selected,
  onSelect,
}) => {
  return (
    <Box>
      <ListItemButton
        selected={selected}
        onClick={() => onSelect(contact)}
        sx={{
          borderRadius: 2,
        }}
      >
        <ListItemAvatar>
          <Avatar src={"SupportAI-Frontend/public/user.png"} />
        </ListItemAvatar>
        <ListItemText primary={contact.username} />
      </ListItemButton>
    </Box>
  );
};

export default ContactCard;
