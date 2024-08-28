import { CreateGuideRequest } from "@/api/types/Guide";
import { useGuideContext } from "@/app/providers/guide";
import { useCreateGuide } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { schema } from "../validations/schema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCategories } from "../../hooks/useCategories";

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

  const {categories} = useCategories();
  const [selectedCategories, setSelectedCategories] = useState<string[]>(watch("categories") || []);
  const handleCategoryChange = (event: any, newValue: string[]) => {
    if (newValue.length <= 3) {
      setSelectedCategories(newValue);
      setValue("categories", newValue);
    }
  };


  return {
    guide,
    categories,
    selectedCategories,
    handleCategoryChange,
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
