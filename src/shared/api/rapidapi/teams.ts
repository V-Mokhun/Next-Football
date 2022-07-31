import { BaseApi } from "../base";
import { catchError } from "../lib";
import { apiInstance } from "./config";
import { GetTeamsResponse, TeamsQueryParams } from "./models";

const TEAMS_URL = "teams";

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
}

export const teamsApi = new TeamsApi(apiInstance);
