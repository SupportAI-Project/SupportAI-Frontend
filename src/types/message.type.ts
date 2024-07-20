export interface Message {
  content: string;
  isNote: boolean;
  isSupportSender: boolean;
  chatId: number;
  time: Date;
}
