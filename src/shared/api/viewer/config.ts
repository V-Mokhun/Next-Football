import { LOCAL_API_URL } from "@/shared/config";
import axios from "axios";

export const apiInstance = axios.create({
  baseURL: LOCAL_API_URL,
});
