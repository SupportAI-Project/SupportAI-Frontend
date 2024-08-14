import { z } from "zod";

export const schema = z.object({
  username: z.string().min(6, "Invalid username"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
