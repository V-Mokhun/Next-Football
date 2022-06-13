import axios from "axios";

export const catchError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    throw new Error(error.message);
  }

  throw new Error("An unexpected error happened..");
};
