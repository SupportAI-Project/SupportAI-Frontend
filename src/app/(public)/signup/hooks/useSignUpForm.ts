import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../validations/schema";
import { useRouter } from "next/navigation";
import { useSignUp } from "@/hooks";
import { SignUpRequest } from "@/api/types/signup";

const useSignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpRequest>({
    resolver: zodResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const router = useRouter();

  const { mutate, isError, error, isPending } = useSignUp();

  const onSubmit = (data: SignUpRequest) => {
    mutate(data, {
      onSuccess: () => {
        router.push("/login");
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

export default useSignUpForm;
