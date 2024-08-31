import { useGuideContext } from "@/app/providers/guide";
import { SuccessResponse, ErrorResponse, isSuccessResponse } from "@/types";
import { useRouter } from "next/navigation";
import { ModelCreateGuideResponse } from "@/api/types/model";
import { useModelGenerateGuide } from "@/hooks/api/modelHooks";

export const useGuide = () => {
  const router = useRouter();
  const { setGuide } = useGuideContext();
  const { mutate, isError, error, isPending } = useModelGenerateGuide();

  async function handleGenerateGuide(chatId: number): Promise<void> {
    mutate(chatId, {
      onSuccess: (response) => {
        const modelCreateGuideResponse =
          response as SuccessResponse<ModelCreateGuideResponse>;
        const guideResponse = modelCreateGuideResponse.data;
        setGuide(guideResponse);
        router.push("new_dashboard/guides/create");
      },
    });
  }

  return {
    handleGenerateGuide,
    isPending,
    guideError: error,
    isGuideError: isError,
  };
};
