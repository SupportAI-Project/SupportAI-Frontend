import { User } from "./User";

export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = User;
