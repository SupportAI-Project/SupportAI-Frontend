import { useDeleteGuide as useDeleteGuideHook } from "@/hooks";
import { useRouter } from "next/navigation";

export const useDeleteGuide = (id: number) => {
  const router = useRouter();
  const { mutate, error, isError } = useDeleteGuideHook();

  const handleDelete = () => {
    mutate(id, {
      onSuccess: () => {
        router.push("/new_dashboard/guides");
      },
    });
  };
  return { handleDelete, error, isError };
};
