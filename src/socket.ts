import { io, Socket } from "socket.io-client";

let socket: Socket = io("http://localhost:8080/chat", {
  transports: ["websocket", "polling"],
});

export default socket;
