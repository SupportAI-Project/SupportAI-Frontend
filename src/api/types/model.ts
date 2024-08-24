type ModelCreateGuideRequest = {
  messages: Message[];
  user: User;
};

type User = {
  username: string;
  roles: string[];
};

type ModelCreateGuideResponse = {
  contentHTML: string;
  title: string;
};
