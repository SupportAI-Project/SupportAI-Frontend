import { BaseClient } from "./base.client";
import { ChatRequest, ChatRequestClose, ChatResponse } from "./types/chat";

export class ChatClient extends BaseClient {
  async chats() {
    return this.get<ChatResponse[]>("chats");
  }
  async chatById(chatRequest: ChatRequest) {
    return this.get<ChatResponse>(`chats/${chatRequest.id}`);
  }
  async closeChat(chatRequestClose: ChatRequestClose) {
    return this.patch<ChatResponse>(`chats/${chatRequestClose.id}`, {
      isOpen: false,
      customerId: chatRequestClose.customerId,
    });
  }
}
