import { BaseApi } from "../base";
import { catchApiError, catchError } from "../lib";
import { apiInstance } from "./config";
import { GetLeaguesResponse, GetTeamsResponse } from "./models";

const SEARCH_LEAGUES_API = "leagues";
const SEARCH_TEAMS_API = "teams";

class SearchApi extends BaseApi {
  async searchLeagues(searchQuery: string) {
    if (searchQuery.trim().length < 3)
      throw catchError("Provide valid search query");

    const url = this.makeUrl(SEARCH_LEAGUES_API, {
      search: searchQuery,
    });

    const data = await this.getRequest<GetLeaguesResponse>(url);

    catchApiError(data.errors);

    return data;
  }
  async searchTeams(searchQuery: string) {
    if (searchQuery.trim().length < 3)
      throw catchError("Provide valid search query");

    const url = this.makeUrl(SEARCH_TEAMS_API, {
      search: searchQuery,
    });

    const data = await this.getRequest<GetTeamsResponse>(url);

    return data;
  }
}

export const searchApi = new SearchApi(apiInstance);
