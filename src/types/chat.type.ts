import { Message } from "./message.type";
import { User } from "./user.type";

export interface Chat {
  chatId: number;
  customerId: number;
  isOpen: boolean;
  startTime: Date;
  endTime?: Date;
  messages?: Message[];
  user?: User;
}
