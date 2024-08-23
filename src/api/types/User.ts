import { z } from 'zod';

export const userSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string().email().optional(),
  password: z.string().optional(),
  roles: z.array(z.string()),
});

export type User = z.infer<typeof userSchema>;
