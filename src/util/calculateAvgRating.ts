import { Guide } from "@/api/types/Guide";

export const calculateAvgRating = (guide: Guide): number => {
  return guide.reviews?.reduce((acc, review) => acc + review.rating, 0) ?? 1;
};