import { z } from "zod";
import { userSchema } from "./User";

export const reviewSchema = z.object({
  id: z.number(),
  userId: z.number(),
  guideId: z.number(),
  rating: z.number().min(1).max(5),
  title: z.string(),
  comment: z.string().optional(),
  createdAt: z.date(),
  user: userSchema.optional(),
});

export type Review = z.infer<typeof reviewSchema>;

export const CreateReviewSchema = z.object({
  guideId: z.number({
    required_error: "Guide ID is required",
  }),

  rating: z
    .number({
      required_error: "Stars rating is required",
    })
    .min(1, "Stars rating must be at least 1")
    .max(5, "Stars rating cannot exceed 5"),

  comment: z.string().optional(),

  title: z.string({
    required_error: "Title is required",
  }),
});

export type CreateReviewRequest = z.infer<typeof CreateReviewSchema>;
