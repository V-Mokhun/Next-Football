import { BaseApi } from "../base";
import { catchApiError, catchError } from "../lib";
import { apiInstance } from "./config";
import {
  FixturesQueryParams,
  GetFixturesResponse,
  GetSingleFixtureResponse,
  HeadToHeadQueryParams,
  SingleFixtureQueryParams,
} from "./models";

const FIXTURES_URL = "fixtures";
const HEAD_TO_HEAD_URL = `${FIXTURES_URL}/headtohead`;

class FixturesApi extends BaseApi {
  async getFixtures(params: FixturesQueryParams) {
    try {
      const url = this.makeUrl(FIXTURES_URL, params);

      const { data } = await apiInstance.get<GetFixturesResponse>(url);

      catchApiError(data.errors, "No fixtures found..");

      return data;
    } catch (error) {
      throw catchError(error);
    }
  }

  async getSingleFixture(params: SingleFixtureQueryParams) {
    try {
      const url = this.makeUrl(FIXTURES_URL, params);

      const { data } = await apiInstance.get<GetSingleFixtureResponse>(url);

      catchApiError(data.errors, "No fixture found..");

      return data;
    } catch (error) {
      throw catchError(error);
    }
  }

  async getHeadToHead(params: HeadToHeadQueryParams) {
    try {
      const url = this.makeUrl(HEAD_TO_HEAD_URL, params);

      const { data } = await apiInstance.get<GetFixturesResponse>(url);

      catchApiError(data.errors, "No head to heads found..");

      return data;
    } catch (error) {
      throw catchError(error);
    }
  }
}

export const fixturesApi = new FixturesApi(apiInstance);
