import { BaseClient } from "./base.client";
import { ChatRequest, ChatRequestUpdate, ChatResponse } from "./types/chat";

export class ChatClient extends BaseClient {
  async chats() {
    return this.get<ChatResponse[]>("chats");
  }
  async chatById(chatRequest: ChatRequest) {
    return this.get<ChatResponse>(`chats/${chatRequest.id}`);
  }
  async closeChat(chatRequestUpdate: ChatRequestUpdate) {
    return this.patch<ChatResponse>(`chats/${chatRequestUpdate.id}`, {
      isOpen: false,
      customerId: chatRequestUpdate.customerId,
    });
  }
}
