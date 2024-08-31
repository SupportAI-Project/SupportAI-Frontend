import { ChatClient } from "@/api/chat.client";
import { ErrorResponse, isSuccessResponse } from "@/types";
import { Contact } from "../../../types";
import { useCloseChat } from "@/hooks";
import { ChatRequestClose } from "@/api/types/chat";

interface Props {
  handleContactSelect: (contact: Contact) => void;
  selectedContact: Contact | null;
}

export const useChat = ({ handleContactSelect, selectedContact }: Props) => {
  const { mutate, error, isError } = useCloseChat();

  async function handleCloseChat(
    chatRequestClose: ChatRequestClose
  ): Promise<void> {
    mutate(chatRequestClose, {
      onSuccess: () => {
        if (selectedContact) {
          handleContactSelect({
            chatId: selectedContact.chatId,
            isOpen: false,
            userId: selectedContact.userId,
            username: selectedContact.username,
          });
        }
      },
    });
  }

  return {
    handleCloseChat,
    chatError: error,
    isChatError: isError,
  };
};
