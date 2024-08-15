import { AuthClient } from "@/api/auth.client";
import { LoginRequest } from "@/api/types/login";
import { SignUpRequest } from "@/api/types/signup";
import { useMutation } from "@tanstack/react-query";

const authClient = new AuthClient();

export function useLogin() {
  return useMutation({
    mutationFn: (data: LoginRequest) => authClient.login(data),
  });
}

export function useSignUp() {
  return useMutation({
    mutationFn: (data: SignUpRequest) => authClient.register(data),
  });
}
