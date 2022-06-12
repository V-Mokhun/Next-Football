import axios from "axios";
import { apiInstance } from "./config";
import { GetTimezonesResponse } from "./models";

const TIMEZONES_URL = "timezone";

class SettingsApi {
  async getTimezones() {
    try {
      const { data } = await apiInstance.get<GetTimezonesResponse>(
        TIMEZONES_URL
      );
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.message);
      }

      throw new Error("An unexpected error happened..");
    }
  }
}

export const settingsApi = new SettingsApi();
