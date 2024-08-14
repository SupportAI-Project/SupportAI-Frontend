import { AuthClient } from "@/api/auth.client";
import { LoginRequest } from "@/api/types/login";
import { useMutation } from "@tanstack/react-query";

const authClient = new AuthClient();

export function useLogin() {
  return useMutation({
    mutationFn: (data: LoginRequest) => authClient.login(data),
  });
}
