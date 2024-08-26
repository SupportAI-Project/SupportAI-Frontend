import { z } from "zod";
import { userSchema } from "./User";
import { reviewSchema } from "./Review";

const guideSchema = z.object({
  id: z.number(),
  title: z.string(),
  contentHTML: z.string(),
  creatorId: z.number(),
  createdAt: z.date(),
  creator: userSchema.optional(),
  reviews: z.array(reviewSchema).optional(),
});

export type GuideRequestUpdate = Partial<Guide>;

export type Guide = z.infer<typeof guideSchema>;
