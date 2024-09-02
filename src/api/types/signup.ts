import { User } from "./User";

export type SignUpRequest = {
  username: string;
  email: string;
  password: string;
};

export type SignUpResponse = User;
