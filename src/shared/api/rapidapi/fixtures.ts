import { BaseApi } from "../base";
import { catchApiError } from "../lib";
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
    const url = this.makeUrl(FIXTURES_URL, params);
    const data = await this.getRequest<GetFixturesResponse>(url);

    catchApiError(data.errors, "No fixtures found..");

    return data;
  }

  async getSingleFixture(params: SingleFixtureQueryParams) {
    const url = this.makeUrl(FIXTURES_URL, params);
    const data = await this.getRequest<GetSingleFixtureResponse>(url);

    catchApiError(data.errors, "No fixture found..");

    return data;
  }

  async getHeadToHead(params: HeadToHeadQueryParams) {
    const url = this.makeUrl(HEAD_TO_HEAD_URL, params);
    const data = await this.getRequest<GetFixturesResponse>(url);

    catchApiError(data.errors, "No head to heads found..");

    return data;
  }
}

export const fixturesApi = new FixturesApi(apiInstance);
