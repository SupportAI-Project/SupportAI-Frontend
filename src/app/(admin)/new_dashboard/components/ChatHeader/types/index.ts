export type Chat = {
  messages: Message[];
  user: User;
};
export interface User {
  id: number;
  username: string;
  roles: string[];
}
