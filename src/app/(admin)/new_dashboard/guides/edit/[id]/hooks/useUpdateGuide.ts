import { CreateGuideRequest, UpdateGuideRequest } from "@/api/types/Guide";
import { useUpdateGuide } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { schema } from "../../../validations/guideSchema";
import { useRouter } from "next/navigation";

export const useUpdateGuideHook = (id: number) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateGuideRequest>({
    resolver: zodResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const router = useRouter();
  const { mutate, isError, error } = useUpdateGuide();

  const handleSave = (createGuideRequest: CreateGuideRequest) => {
    mutate(
      { ...createGuideRequest, id },
      {
        onSuccess: () => {
          router.push("/new_dashboard/guides/" + id);
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  return {
    register,
    handleSubmit: handleSubmit(handleSave),
    setValue,
    errors,
    isServerError: isError,
    serverError: error,
    watch,
  };
};
