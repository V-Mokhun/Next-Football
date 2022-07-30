import { catchApiError, catchError } from "../lib";
import { apiInstance } from "./config";
import { GetTimezonesResponse } from "./models";

const TIMEZONES_URL = "timezone";

class SettingsApi {
  async getTimezones() {
    try {
      const { data } = await apiInstance.get<GetTimezonesResponse>(
        TIMEZONES_URL
      );

      catchApiError(data.errors, "No timezones found");

      return data;
    } catch (error) {
      throw catchError(error);
    }
  }
}

export const settingsApi = new SettingsApi();
