import { useIssue } from "@/hooks/api/issueHooks";

export const useCategories = () => {
  const { data: issue, error, isLoading, isSuccess } = useIssue();
  let categories: string[] = [];
  if (isSuccess && "data" in issue) {
    categories = issue.data.categories.toSorted();
  }
  return { categories, error, isLoading };
};
