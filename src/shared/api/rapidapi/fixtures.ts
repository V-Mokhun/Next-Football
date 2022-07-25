import { BaseApi } from "../base";
import { catchError } from "../lib";
import { apiInstance } from "./config";
import { FixturesQueryParams, GetFixturesResponse } from "./models";

const FIXTURES_URL = "fixtures";

class FixturesApi extends BaseApi {
  async getFixtures(params: FixturesQueryParams) {
    try {
      const url = this.makeUrl(FIXTURES_URL, params);

      const { data } = await apiInstance.get<GetFixturesResponse>(url);

      return data;
    } catch (error) {
      throw catchError(error);
    }
  }
}

export const fixturesApi = new FixturesApi(apiInstance);
