import { z } from "zod";

export const schema = z.object({
  contentHTML: z.string(),
  title: z.string(),
});
