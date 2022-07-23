import { BaseApi } from "../base";
import { catchError } from "../lib";
import { apiInstance } from "./config";
import { GetLeaguesResponse, GetTeamsResponse } from "./models";

const SEARCH_LEAGUES_API = "leagues";
const SEARCH_TEAMS_API = "teams";

class SearchApi extends BaseApi {
  async searchLeagues(searchQuery: string) {
    if (searchQuery.trim().length < 3)
      throw catchError("Provide valid search query");

    try {
      const url = this.makeUrl(SEARCH_LEAGUES_API, {
        search: searchQuery,
      });

      const { data } = await apiInstance.get<GetLeaguesResponse>(url);

      return data;
    } catch (error) {
      throw catchError(error);
    }
  }
  async searchTeams(searchQuery: string) {
    if (searchQuery.trim().length < 3)
      throw catchError("Provide valid search query");

    try {
      const url = this.makeUrl(SEARCH_TEAMS_API, {
        search: searchQuery,
      });

      const { data } = await apiInstance.get<GetTeamsResponse>(url);

      return data;
    } catch (error) {
      throw catchError(error);
    }
  }
}

export const searchApi = new SearchApi(apiInstance);
