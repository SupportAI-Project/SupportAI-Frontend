import { GuideClient } from "@/api/guide.client";
import { CreateGuideRequest, UpdateGuideRequest } from "@/api/types/Guide";
import { useQuery, useMutation } from "@tanstack/react-query";

const guideClient = new GuideClient();

export function useAllGuides() {
  return useQuery({
    queryKey: ["guides"],
    queryFn: () => guideClient.getAllGuides(),
  });
}

export function useGuide(guideId: number) {
  return useQuery({
    queryKey: ["guide", guideId],
    queryFn: () => guideClient.getGuide(guideId),
    refetchOnWindowFocus: false,
  });
}

export function useCreateGuide() {
  return useMutation({
    mutationFn: (data: CreateGuideRequest) => guideClient.createGuide(data),
  });
}

export function useUpdateGuide() {
  return useMutation({
    mutationFn: (data: UpdateGuideRequest) => guideClient.updateGuide(data),
  });
}

export function useDeleteGuide() {
  return useMutation({
    mutationFn: (guideId: number) => guideClient.deleteGuide(guideId),
  });
}
