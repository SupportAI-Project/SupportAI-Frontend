export interface ErrorResponse {
  statusCode: number;
  message: string;
  error: string;
}

export interface SuccessResponse<T> {
  data: T;
}

export type ClientResponse<T> = SuccessResponse<T> | ErrorResponse;

export const isSuccessResponse = <T>(
  response: ClientResponse<T>
): response is SuccessResponse<T> => {
  return (response as SuccessResponse<T>).data !== undefined;
};
