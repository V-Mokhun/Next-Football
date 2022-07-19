import { BaseApi } from "../base";
import { catchError } from "../lib";
import { apiInstance } from "./config";
import { GetLeaguesResponse, LeaguesQueryParams } from "./models";

const LEAGUES_URL = "leagues";

class LeaguesApi extends BaseApi {
  async getLeagues(params: LeaguesQueryParams) {
    try {
      const url = this.makeUrl(LEAGUES_URL, params);

      const { data } = await apiInstance.get<GetLeaguesResponse>(url);

      return data;
    } catch (error) {
      throw catchError(error);
    }
  }
}

export const leaguesApi = new LeaguesApi();
