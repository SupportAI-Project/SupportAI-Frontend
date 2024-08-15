import { User } from "@/types";

export type SignUpRequest = {
  username: string;
  email: string;
  password: string;
};

export type SignUpResponse = User;
