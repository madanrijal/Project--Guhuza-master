import { AxiosError } from "axios";

export interface SuccessResponse<T = null> {
  success: true;
  message: string;
  data: T;
}

export interface ErrorResponse {
  success: false;
  message: string;
  error: Record<string, string[]> | string | null;
}

export interface ZodErrorResponse {
  success: false;
  message: string;
  error: Record<string, string[]>;
}

export type ApiResponse<T = null> =
  | SuccessResponse<T>
  | ErrorResponse
  | ZodErrorResponse;

export interface ApiError
  extends AxiosError<ErrorResponse | ZodErrorResponse> { }
