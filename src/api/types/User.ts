import { z } from 'zod';

export const userSchema = z.object({
  userId: z.number(),
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  roles: z.array(z.string()),
});

export type User = z.infer<typeof userSchema>;
