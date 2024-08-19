import { z } from 'zod';

const reviewSchema = z.object({
  reviewId: z.number(),
  userId: z.number(),
  guideId: z.number(),
  stars: z.number().min(1).max(5),
  comment: z.string().optional(),
  createdAt: z.date(),
});

export type Review = z.infer<typeof reviewSchema>;
