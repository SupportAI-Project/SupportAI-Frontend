import { User } from "@/types";

export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = User;
