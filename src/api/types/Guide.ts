import { z } from 'zod';

const userSchema = z.object({
  userId: z.number(),
  username: z.string(),
  email: z.string(),
  password: z.string(), 
  roles: z.array(z.string()),
}).optional();

const reviewSchema = z.object({
  reviewId: z.number(),
  userId: z.number(),
  guideId: z.number(),
  stars: z.number(),
  comment: z.string(),
  createdAt: z.date(),
});

const guideSchema = z.object({
  guideId: z.number(),
  title: z.string(),
  contentHTML: z.string(),
  creatorId: z.number(),
  createdAt: z.date(),
  creator: userSchema.optional(), 
  reviews: z.array(reviewSchema).optional(), 
});

export type Guide = z.infer<typeof guideSchema>;