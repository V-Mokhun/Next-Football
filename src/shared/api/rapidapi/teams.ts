import { BaseApi } from "../base";
import { catchApiError } from "../lib";
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
    const url = this.makeUrl(TEAMS_URL, params);
    const data = await this.getRequest<GetTeamsResponse>(url);

    return data;
  }

  async getCurrentSeason(id: number) {
    const url = `${SEASONS_URL}?team=${id}`;
    const data = await this.getRequest<GetSeasonsResponse>(url);

    if (data.response.length < 1) {
      throw catchApiError(data.errors, "An unexpected error happened..");
    }

    return data.response[data.response.length - 1];
  }
}

export const teamsApi = new TeamsApi(apiInstance);
