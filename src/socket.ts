"use client";
import { io, Socket } from "socket.io-client";
import { z } from "zod";

const socketUrlSchema = z.string().url();

const socketUrlEnv = process.env.NEXT_PUBLIC_SOCKET_URL;
const socketUrl = socketUrlSchema.safeParse(socketUrlEnv);

if (!socketUrl.success) {
  throw new Error(
    `Invalid SOCKET_URL environment variable: ${socketUrl.error.message}`
  );
}

let socket: Socket = io(socketUrl.data, {
  transports: ["websocket"],
  autoConnect: false,
});

export default socket;
