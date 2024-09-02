import { z } from "zod";

export const messageSchema = z.object({
  id: z.number(),
  chatId: z.number(),
  isSupportSender: z.boolean(),
  content: z.string(),
  isNote: z.boolean(),
  timeStamp: z.date(),
});

export type Message = z.infer<typeof messageSchema>;
