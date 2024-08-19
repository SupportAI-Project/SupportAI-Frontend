interface ErrorResponse {
  statusCode: number;
  message: string;
  error: string;
}

export interface SuccessResponse<T> {
  data: T;
}

export type ClientResponse<T> = SuccessResponse<T> | ErrorResponse;

class ApiError extends Error {
  statusCode: number;
  error: string;

  constructor(statusCode: number, message: string, error: string) {
    super(message);
    this.statusCode = statusCode;
    this.error = error;
    this.name = "ApiError";
  }
}

export class BaseClient {
  base: string | undefined;

  constructor() {
    this.base = process.env.NEXT_PUBLIC_SERVER_URL;
  }

  private async request<T>(
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    body?: any,
    options: RequestInit = {}
  ): Promise<ClientResponse<T>> {
    if (!this.base) {
      throw new Error("Base URL is not defined");
    }

    const fetchOptions: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      credentials: "include",
      ...options,
    };

    if (method !== "GET" && method !== "DELETE") {
      fetchOptions.body = body != null ? JSON.stringify(body) : undefined;
    }

    try {
      const response = await fetch(`${this.base}/${endpoint}`, fetchOptions);

      if (!response.ok) {
        const errorData: ErrorResponse = await response.json();

        throw new ApiError(
          errorData.statusCode,
          errorData.message,
          errorData?.error
        );
      }

      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const data: T = await response.json();
        return {
          data,
        };
      } else {
        return {
          data: {} as T,
        };
      }
    } catch (error) {
      console.error("An error occurred", error);
      if (error instanceof ApiError) {
        throw error;
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  }

  protected async get<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ClientResponse<T>> {
    return this.request<T>(endpoint, "GET", options);
  }

  protected async post<T>(
    endpoint: string,
    body: any,
    options: RequestInit = {}
  ): Promise<ClientResponse<T>> {
    return this.request<T>(endpoint, "POST", body, options);
  }

  protected async put<T>(
    endpoint: string,
    body: any,
    options: RequestInit = {}
  ): Promise<ClientResponse<T>> {
    return this.request<T>(endpoint, "PUT", body, options);
  }

  protected async delete<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ClientResponse<T>> {
    return this.request<T>(endpoint, "DELETE", options);
  }
}
