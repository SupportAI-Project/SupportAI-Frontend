import { Message } from "./message";
import { User } from "./User";

export type ModelCreateGuideRequest = {
  messages: Pick<Message, "content" | "isSupportSender">[];
  user: Pick<User, "username">;
};

export type ModelCreateGuideResponse = {
  contentHTML: string;
  title: string;
};
