import axios from "axios";

export const catchError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    throw new Error((error.response?.data as any)?.data || error.message);
  }

  throw new Error(
    typeof error === "string" ? error : "An unexpected error happened.."
  );
};
