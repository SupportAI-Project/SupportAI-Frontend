import { useAllGuides } from "@/hooks";
import { Guide } from "@/api/types/Guide";

export const useGuideItems = () => {
  const {
    data: guideItems,
    isLoading: isLoadingGuides,
    error: guidesError,
    isError: isGuidesError,
    isSuccess: isGuidesSuccess,
  } = useAllGuides();

    let guides: Guide[] = [];

    if (isGuidesSuccess && "data" in guideItems) {
      guides = guideItems.data;
    }

    return { guides, isLoadingGuides, guidesError, isGuidesError, isGuidesSuccess };

};
