import { GuideClient } from "@/api/guide.client";
import { useMutation } from "@tanstack/react-query";

const guideClient = new GuideClient();
type UpdateGuidePayload = {
  id: number;
  guide: {
    title: string;
    contentHTML: string;
  };
};
export const useUpdateGuide = () => {
  return useMutation({
    mutationFn: async (payload: UpdateGuidePayload) => {
      const { id, guide } = payload;
      return guideClient.updateGuide(id, guide);
    },
  });
};
