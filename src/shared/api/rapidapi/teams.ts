import { BaseApi } from "../base";
import { catchApiError, catchError } from "../lib";
import { apiInstance } from "./config";
import {
  GetSeasonsResponse,
  GetTeamsResponse,
  TeamsQueryParams,
} from "./models";

const TEAMS_URL = "teams";
const SEASONS_URL = `${TEAMS_URL}/seasons`;

class TeamsApi extends BaseApi {
  async getTeams(params: TeamsQueryParams) {
    try {
      const url = this.makeUrl(TEAMS_URL, params);

      const { data } = await apiInstance.get<GetTeamsResponse>(url);

      return data;
    } catch (error) {
      throw catchError(error);
    }
  }

  async getCurrentSeason(id: number) {
    try {
      const url = `${SEASONS_URL}?team=${id}`;

      const { data } = await apiInstance.get<GetSeasonsResponse>(url);

      if (data.response.length < 1) {
        catchApiError(data.errors);
      }

      return data.response[data.response.length - 1];
    } catch (error) {
      throw catchError(error);
    }
  }
}

export const teamsApi = new TeamsApi(apiInstance);
