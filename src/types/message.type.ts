export interface Message {
  content: string;
  isNote: boolean;
  isSupportSender: boolean;
  chatId: string;
  time: Date;
}
