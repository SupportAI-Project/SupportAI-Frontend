export interface Message {
  messageId: number;
  content: string;
  isNote: boolean;
  isSupportSender: boolean;
  chatId: number;
  timeStamp: Date;
}
