import { User } from "./user.type";

export interface Chat {
  chatId: number;
  customerId: number;
  isOpen: boolean;
  startTime: Date;
  endTime?: Date;
  user?: User;
}
