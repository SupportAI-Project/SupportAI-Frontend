import { CreateGuideRequest } from "@/api/types/Guide";
import { useGuideContext } from "@/app/providers/guide";
import { useCreateGuide } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { schema } from "../validations/schema";
import { useRouter } from "next/navigation";

export const useGuide = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<CreateGuideRequest>({
    resolver: zodResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      categories: [],
    },
  });
  const { guide } = useGuideContext();

  const router = useRouter();

  const { mutate, isError, error, isPending } = useCreateGuide();

  const onSubmit = (data: CreateGuideRequest) => {
    mutate(data, {
      onSuccess: (response) => {
        console.log(response);
        router.push("/new_dashboard/guides");
      },
    });
  };

  return {
    guide,
    register,
    setValue,
    watch,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isValid,
    isError,
    error,
    isPending,
  };
};
