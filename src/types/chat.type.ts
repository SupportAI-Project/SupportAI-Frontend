import { Message } from './message.type';
import { User } from '@/api/types/User';
export interface Chat {
  id: number;
  customerId: number;
  isOpen: boolean;
  startTime: Date;
  endTime?: Date;
  messages?: Message[];
  user?: User;
}
