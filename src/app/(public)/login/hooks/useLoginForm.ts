import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../validations/schema";
import { LoginRequest } from "@/api/types/login";
import { useRouter } from "next/navigation";
import { useLogin } from "@/hooks";
import { SuccessResponse } from "@/types";
import { UserRole } from "@/api/types/User";

const useLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginRequest>({
    resolver: zodResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const router = useRouter();

  const { mutate, isError, error, isPending } = useLogin();

  const onSubmit = (data: LoginRequest) => {
    mutate(data, {
      onSuccess: (response) => {
        const { data: user } = response as SuccessResponse<UserRole>;
        if (user.roles.includes("admin")) {
          router.push("/new_dashboard");
        } else {
          router.push("/new_chat/" + user.id);
        }
      },
    });
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isValid,
    isError,
    isPending,
    error,
  };
};

export default useLoginForm;
