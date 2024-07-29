import axios, { AxiosHeaders, AxiosRequestConfig } from "axios";
import { SERVER_URL } from "../config";

export const apiRequest = async (
  endpoint: string,
  method: string,
  body?: AxiosRequestConfig["data"],
  headers?: AxiosHeaders
) => {
  const finalHeaders = new AxiosHeaders({
    ...headers,
    "Content-Type":
      headers && headers["Content-Type"]
        ? headers["Content-Type"]
        : "application/json",
  });
  try {
    const response = await axios({
      url: `${SERVER_URL}${endpoint}`,
      method: method,
      headers: finalHeaders,
      data: body,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};
