import { BaseApi } from "../base";
import { apiInstance } from "./config";
import { GetLeaguesResponse, LeaguesQueryParams } from "./models";

const LEAGUES_URL = "leagues";

class LeaguesApi extends BaseApi {
  async getLeagues(params: LeaguesQueryParams) {
    const url = this.makeUrl(LEAGUES_URL, params);
    const data = await this.getRequest<GetLeaguesResponse>(url);

    return data;
  }
}

export const leaguesApi = new LeaguesApi(apiInstance);
