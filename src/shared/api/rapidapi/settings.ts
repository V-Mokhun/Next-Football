import { apiInstance } from "./config";
import { catchError } from "../lib";
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
      throw catchError(error);
    }
  }
}

export const settingsApi = new SettingsApi();
