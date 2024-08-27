import { GuideClient } from "@/api/guide.client";
import { useQuery, useMutation } from "@tanstack/react-query";
import { CreateReviewDto } from "../dto/CreateReviewDto";
import {
  Guide,
  GuideRequestUpdate,
  UpdateGuidePayload,
} from "@/api/types/Guide";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  return useMutation({
    mutationFn: () => guideClient.deleteGuide(guideId),
    onSuccess: () => {
      router.push("/new_dashboard/guides");
    },
    onError: () => {
      alert("Failed to delete guide. Please try again.");
    },
  });
}

export const useUpdateGuide = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (payload: UpdateGuidePayload) => {
      const { id, guide } = payload;
      return guideClient.updateGuide(id, guide);
    },
    onSuccess: (data, variables) => {
      const { id } = variables;
      router.push(`/new_dashboard/guides/${id}`);
    },
    onError: () => {
      alert("Failed to update guide. Please try again.");
    },
  });
};

export function useAddReview() {
  return useMutation({
    mutationFn: (review: CreateReviewDto) => guideClient.addReview(review),
  });
}
