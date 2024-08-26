import { z } from "zod";
import { messageSchema } from "./message";
import { userSchema } from "./User";

export const chatSchema = z.object({
  id: z.number(),
  customerId: z.number(),
  isOpen: z.boolean(),
  startTime: z.date(),
  endTime: z.date().optional(),
  messages: z.array(messageSchema),
  user: userSchema,
});

export type Chat = z.infer<typeof chatSchema>;

export type ChatRequest = {
  id: number;
};

export type ChatResponse = Chat;
