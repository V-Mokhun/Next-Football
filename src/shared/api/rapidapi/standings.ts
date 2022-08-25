import { BaseApi } from "../base";
import { apiInstance } from "./config";
import { GetStandingsResponse, StandingsQueryParams } from "./models";

const STANDINGS_URL = "standings";

class StandingsApi extends BaseApi {
  async getStandings(params: StandingsQueryParams) {
    const url = this.makeUrl(STANDINGS_URL, params);
    const data = await this.getRequest<GetStandingsResponse>(url);

    return data;
  }
}

export const standingsApi = new StandingsApi(apiInstance);
