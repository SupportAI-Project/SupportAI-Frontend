import { z } from 'zod';
import { userSchema } from './User';
import { reviewSchema } from './Review';

const guideSchema = z.object({
  id: z.number(),
  title: z.string(),
  tags: z.array(z.string()).max(3),
  issue: z.string(),
  creatorId: z.number(),
  createdAt: z.date(),
  creator: userSchema.optional(),
  reviews: z.array(reviewSchema).optional(),
});

export type Guide = z.infer<typeof guideSchema>;

export type CreateGuideRequest = {
  title: string;
  contentHTML: string;
  tags: string[];
};
