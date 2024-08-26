"use client";
import { useEffect, useState } from "react";
import { ClientResponse, SuccessResponse } from "@/types";
import { useChats } from "@/hooks/api/chatHooks";
import { useOnFetch } from "@/common/hooks/useOnFetch";
import { Socket } from "socket.io-client";
import { Contact } from "../types";
import { Chat } from "@/api/types/chat";

type Props = {
  socket: Socket;
};

export const useContacts = ({ socket }: Props) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const { isError, data, error } = useChats();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    if (socket && selectedContact && !selectedContact.isOpen) {
      setContacts(
        contacts.map((contact) =>
          contact.chatId === selectedContact.chatId
            ? { ...contact, isOpen: false }
            : contact
        )
      );
      return;
    }
    if (socket && selectedContact) {
      socket.emit("join", { chatId: selectedContact.chatId });
      return () => {
        socket.emit("leave", { chatId: selectedContact.chatId });
      };
    }
  }, [selectedContact]);

  const handleContactSelect = (contact: Contact) => {
    console.log(contact);
    setSelectedContact(contact);
  };

  useOnFetch(
    (clientResponse: ClientResponse<Chat[]>) => {
      if (isError) {
        throw error;
      } else {
        const successResponse = clientResponse as SuccessResponse<Chat[]>;
        const chats = successResponse.data;
        const contacts = chats.map((chat) => ({
          chatId: chat.id,
          userId: chat.user?.id ?? 0,
          username: chat.user?.username ?? "a",
          isOpen: chat.isOpen,
        }));
        setContacts(contacts);
        handleContactSelect(contacts[0]);
      }
    },
    !!data || isError,
    data
  );

  useEffect(() => {
    if (socket && contacts) {
      socket.on("chatCreated", (chat: Chat) => {
        const contact = {
          chatId: chat.id,
          userId: chat.customerId,
          username: chat.user!.username,
          isOpen: chat.isOpen,
        };
        setContacts([...contacts, contact]);
      });
    }
  }, [contacts]);

  return {
    contacts,
    selectedContact,
    handleContactSelect,
  };
};
