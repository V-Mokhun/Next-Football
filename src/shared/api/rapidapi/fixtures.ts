import { BaseApi } from "../base";
import { catchError } from "../lib";
import { apiInstance } from "./config";
import { FixturesQueryParams, GetLeaguesResponse, LeaguesQueryParams } from "./models";

const FIXTURES_URL = "fixtures";

class FixturesApi extends BaseApi {
  async getLeagues(params: FixturesQueryParams) {
    try {
      const url = this.makeUrl(FIXTURES_URL, params);

      const { data } = await apiInstance.get<GetLeaguesResponse>(url);

      return data;
    } catch (error) {
      throw catchError(error);
    }
  }
}

export const fixturesApi = new FixturesApi();
