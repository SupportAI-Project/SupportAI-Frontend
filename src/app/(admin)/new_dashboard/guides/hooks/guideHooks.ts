import { GuideClient } from '@/api/guide.client';
import { useQuery } from '@tanstack/react-query';

const guideClient = new GuideClient();

export function useAllGuides() {
  return useQuery({
    queryKey: ['guides'],
    queryFn: () => guideClient.getAllGuides(),
  });
}

export function useReviews(guideId: number) {
  return useQuery({
    queryKey: ['reviews', 'guide', guideId],
    queryFn: () => guideClient.getReviews(guideId),
  });
}

export function useGuide(guideId: number) {
  return useQuery({
    queryKey: ['guide', guideId],
    queryFn: () => guideClient.getGuide(guideId),
  });
}
