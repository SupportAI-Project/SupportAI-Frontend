import { getEnabledCategories } from "trace_events";
import { z } from "zod";

export const schema = z.object({
  contentHTML: z.string(),
  title: z.string(),
  categories: z.array(z.string()).max(3),
});
