import { BaseClient } from "./base.client";
import { LoginRequest, LoginResponse } from "./types/login";

export class AuthClient extends BaseClient {
  async login(loginRequest: LoginRequest) {
    return this.post<LoginResponse>("auth/login", loginRequest);
  }

  async register(username: string, email: string, password: string) {
    return this.post("auth/register", { username, email, password });
  }

  async validateToken() {
    return this.get("auth/validate-token");
  }
}
