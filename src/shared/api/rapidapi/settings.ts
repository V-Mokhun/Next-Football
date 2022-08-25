import { BaseApi } from "../base";
import { catchApiError } from "../lib";
import { apiInstance } from "./config";
import { GetTimezonesResponse } from "./models";

const TIMEZONES_URL = "timezone";

class SettingsApi extends BaseApi {
  async getTimezones() {
    const data = await this.getRequest<GetTimezonesResponse>(TIMEZONES_URL);

    catchApiError(data.errors, "No timezones found");

    return data;
  }
}

export const settingsApi = new SettingsApi(apiInstance);
