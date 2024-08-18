import { io, Socket } from "socket.io-client";

let socket: Socket = io("http://localhost:3001/chat", {
  transports: ["websocket", "polling"],
  autoConnect: false,
});

export default socket;
