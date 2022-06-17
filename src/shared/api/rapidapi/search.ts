import { apiInstance } from "./config";
import { catchError } from "../lib";
import { GetLeaguesResponse, GetTeamsResponse } from "./models";

const SEARCH_LEAGUES_API = "leagues";
const SEARCH_TEAMS_API = "teams";

class SearchApi {
  private makeUrl(apiUrl: string, paramsObj: { [key: string]: string }) {
    let url = `${apiUrl}?`;
    const queries = new URLSearchParams(paramsObj);

    url += queries.toString();

    return url;
  }

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

export const searchApi = new SearchApi();
