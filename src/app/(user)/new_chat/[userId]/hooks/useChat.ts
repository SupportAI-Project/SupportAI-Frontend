import { useEffect, useState } from 'react';
import { useChatByUserId } from '@/hooks/api/chatHooks';
import { Socket } from 'socket.io-client';

type Props = {
  userId: number;
  socket: Socket;
};
type Chat = {
  id: number;
};

export const useChat = ({ userId, socket }: Props) => {
  const [chatId, setChatId] = useState<number | null>(null);
  const { data: chat, error } = useChatByUserId(userId);
  useEffect(() => {
    if (chat) {
      if (chat.user?.id !== userId) {
        socket.emit('create');
        socket.on('chatCreated', (chat: Chat) => {
          socket.emit('join', { chatId: chat.id});
          setChatId(chat.id);
        });
        return;
      }
      if (chat.id) {
        console.log('Chat exists');
        socket.emit('join', { chatId: chat.id });
        setChatId(chat.id);
      }
    }
  }, [chat]);
  return { chatId, error };
};
