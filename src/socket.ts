import { io, Socket } from "socket.io-client";

let socket: Socket;

const createSocketConnection = () => {
  if (!socket) {
    const URL = process.env.BACKEND_URL || "http://localhost:3000";
    socket = io(URL);
  }
  return socket;
};

export default createSocketConnection;
