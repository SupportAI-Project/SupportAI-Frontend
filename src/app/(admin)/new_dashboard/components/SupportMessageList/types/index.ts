type Chat = {
  messages?: Message[];
};
type Message = {
  isNote: boolean;
  isSupportSender: boolean;
  timeStamp: Date;
  content: string;
};
