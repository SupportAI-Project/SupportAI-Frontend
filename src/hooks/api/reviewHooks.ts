import { ReviewClient } from "@/api/review.client";
import { CreateReviewRequest } from "@/api/types/Review";
import { useQuery, useMutation } from "@tanstack/react-query";

const reviewClient = new ReviewClient();

export function useAddReview() {
  return useMutation({
    mutationFn: (review: CreateReviewRequest) => reviewClient.addReview(review),
  });
}
export function useReviews(guideId: number) {
  return useQuery({
    queryKey: ["reviews", "guide", guideId],
    queryFn: () => reviewClient.getReviews(guideId),
  });
}
