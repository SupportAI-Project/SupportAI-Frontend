import { io, Socket } from "socket.io-client";

let socket: Socket = io(process.env.BACKEND_URL || "http://localhost:3000");

export default socket;
