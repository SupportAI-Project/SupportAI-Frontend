import { useContext } from 'react';
import { Socket } from 'socket.io-client';
import { SocketContext } from '../providers/SocketProvider/provider';

export const useSocket = (): Socket => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
