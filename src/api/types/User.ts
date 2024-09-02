import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string().email().optional(),
  roles: z.array(z.string()),
});

export type User = z.infer<typeof userSchema>;

export type UserRole = Pick<User, "id" | "roles">;

export type UserInfo = Pick<User, "id" | "username">;
