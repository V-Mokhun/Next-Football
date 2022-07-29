import { BaseApi } from "../base";
import { catchError } from "../lib";
import { apiInstance } from "./config";
import { GetStandingsResponse, StandingsQueryParams } from "./models";

const STANDINGS_URL = "standings";

class StandingsApi extends BaseApi {
  async getStandings(params: StandingsQueryParams) {
    try {
      const url = this.makeUrl(STANDINGS_URL, params);

      const { data } = await apiInstance.get<GetStandingsResponse>(url);

      return data;
    } catch (error) {
      throw catchError(error);
    }
  }
}

export const standingsApi = new StandingsApi(apiInstance);
