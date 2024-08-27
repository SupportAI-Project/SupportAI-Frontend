"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { createContext, ReactNode, useMemo } from "react";
import socket from "@/socket";
import { Socket } from "socket.io-client";

export const SocketContext = createContext<Socket | null>(null);

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const socketInstance = useMemo(() => {
    socket.connect();
    return socket;
  }, []);

  return (
    <SocketContext.Provider value={socketInstance}>
      {children}
    </SocketContext.Provider>
  );
};



