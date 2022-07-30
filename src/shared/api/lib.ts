import axios from "axios";
import { ApiResponse } from "./models";

export const catchError = (error: any) => {
  if (axios.isAxiosError(error)) {
    throw new Error((error.response?.data as any)?.data || error.message);
  }

  throw new Error(
    error?.message && typeof error.message === "string"
      ? error.message
      : "An unexpected error happened.."
  );
};

export const catchApiError = (
  errors: ApiResponse["errors"],
  errorMessage?: string
) => {
  if (Object.values(errors).length > 0) {
    throw new Error(errorMessage);
  }
};
