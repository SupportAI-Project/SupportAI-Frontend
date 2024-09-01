export type Guide = {
  id: number;
  title: string;
  issue: string;
  likes: number;
  dislikes: number;
};

export type SortCriteria = "rating" | "date";
export const sortOptions = ["Rating", "Date"];