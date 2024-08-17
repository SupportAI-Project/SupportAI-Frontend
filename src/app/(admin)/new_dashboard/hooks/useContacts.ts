import { useState } from "react";
import { Contact } from "../types";

export const useContacts = () => {
  const initialContacts: Contact[] = [
    { name: "Alice", avatar: "/avatar1.png", lastMessage: "See you later!" },
    {
      name: "Bob",
      avatar: "/avatar2.png",
      lastMessage: "Let's catch up tomorrow.",
    },
    {
      name: "Charlie",
      avatar: "/avatar3.png",
      lastMessage: "Can you send me the file?",
    },
  ];

  const [contacts, setContacts] = useState<Contact[]>(initialContacts);

  return { contacts, setContacts };
};
