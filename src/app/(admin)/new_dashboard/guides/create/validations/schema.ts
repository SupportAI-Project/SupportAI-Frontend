import { z } from "zod";

export const schema = z.object({
  contentHTML: z.string().min(1, "Content is required"),
  title: z.string().min(1, "Title is required"),
  categories: z.array(z.string()).max(3, "You can select up to 3 categories"),
});
