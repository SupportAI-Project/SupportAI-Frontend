export interface ErrorResponse {
  statusCode: number;
  message: string;
  error: string;
}

export interface SuccessResponse<T> {
  data: T;
}

export type ClientResponse<T> = SuccessResponse<T> | ErrorResponse;
