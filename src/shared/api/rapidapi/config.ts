import { API_KEY, API_URL } from "@/shared/config";
import axios from "axios";

export const apiInstance = axios.create({
  baseURL: API_URL,
  timeout: 0,
  headers: {
    "x-rapidapi-host": "v3.football.api-sports.io",
    "x-rapidapi-key": API_KEY,
  },
});
