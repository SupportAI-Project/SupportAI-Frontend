import { z } from "zod";

export const schema = z.object({
  message: z
    .string()
    .trim()
    .min(1)
    .refine((msg) => msg.split("\n").length <= 10, {
      message: "Message should not exceed 10 lines",
    }),
});
