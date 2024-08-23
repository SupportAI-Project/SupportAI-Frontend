import { BaseClient } from './base.client';
import { ChatRequest, ChatResponse } from './types/chat';

export class ChatClient extends BaseClient {
  async chats() {
    return this.get<ChatResponse[]>('chats');
  }
  async chatById(chatRequest: ChatRequest) {
    return this.get<ChatResponse>(`chats/${chatRequest.id}`);
  }
}
