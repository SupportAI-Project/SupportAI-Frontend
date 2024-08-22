import { z } from 'zod';

export const CreateReviewSchema = z.object({
  guideId: z.number({
    required_error: 'Guide ID is required',
  }),
  rating: z
    .number({
      required_error: 'Stars rating is required',
    })
    .min(1, 'Stars rating must be at least 1')
    .max(5, 'Stars rating cannot exceed 5'),
  comment: z.string().optional(),
});

export type CreateReviewDto = z.infer<typeof CreateReviewSchema>;
