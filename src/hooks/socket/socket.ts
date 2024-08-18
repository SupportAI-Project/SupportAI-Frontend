import socket from "@/socket";
import { useEffect } from "react";

export const useSocket = () => {
  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);
};
