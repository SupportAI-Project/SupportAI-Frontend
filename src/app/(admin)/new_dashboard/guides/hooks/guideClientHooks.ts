import { GuideClient } from "@/api/guide.client";
import { useQuery, useMutation } from "@tanstack/react-query";
import { CreateReviewDto } from "../dto/CreateReviewDto";
import { Guide, GuideRequestUpdate } from "@/api/types/Guide";

const guideClient = new GuideClient();

export function useAllGuides() {
  return useQuery({
    queryKey: ["guides"],
    queryFn: () => guideClient.getAllGuides(),
  });
}

export function useReviews(guideId: number) {
  return useQuery({
    queryKey: ["reviews", "guide", guideId],
    queryFn: () => guideClient.getReviews(guideId),
  });
}

export function useGuide(guideId: number) {
  return useQuery({
    queryKey: ["guide", guideId],
    queryFn: () => guideClient.getGuide(guideId),
  });
}

export function useDeleteGuide(guideId: number) {
  return useMutation({
    mutationFn: () => guideClient.deleteGuide(guideId),
  });
}

export function useUpdateGuide(id: number, guide: GuideRequestUpdate) {
  return useMutation({
    mutationFn: () => guideClient.updateGuide(id, guide),
  });
}

export function useAddReview() {
  return useMutation({
    mutationFn: (review: CreateReviewDto) => guideClient.addReview(review),
  });
}
