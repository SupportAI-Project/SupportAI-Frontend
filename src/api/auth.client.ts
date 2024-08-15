import { BaseClient } from "./base.client";
import { LoginRequest, LoginResponse } from "./types/login";
import { SignUpRequest } from "./types/signup";

export class AuthClient extends BaseClient {
  async login(loginRequest: LoginRequest) {
    return this.post<LoginResponse>("auth/login", loginRequest);
  }

  async register(signUpRequest: SignUpRequest) {
    return this.post("auth/register", signUpRequest);
  }
}
