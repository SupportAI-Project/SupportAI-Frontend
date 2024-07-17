import { User } from "./user.type";

export interface Chat {
  chatId: number;
  customerId: number;
  isOpen: boolean;
  user: User;
}
