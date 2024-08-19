import { z } from 'zod';

const guideSchema = z.object({
  guideId: z.number(),
  title: z.string(),
  contentHTML: z.string(),
  creatorId: z.number(),
  starsTotalSum: z.number(),
  createdAt: z.date(),
});

export type Guide = z.infer<typeof guideSchema>;
