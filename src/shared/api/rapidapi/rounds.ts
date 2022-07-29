import { BaseApi } from "../base";
import { catchError } from "../lib";
import { apiInstance } from "./config";
import { FixturesQueryParams, GetRoundsResponse } from "./models";

const ROUNDS_URL = "fixtures/rounds";

class RoundsApi extends BaseApi {
  async getRounds(params: FixturesQueryParams) {
    try {
      const url = this.makeUrl(ROUNDS_URL, params);

      const { data } = await apiInstance.get<GetRoundsResponse>(url);

      return data;
    } catch (error) {
      throw catchError(error);
    }
  }
}

export const roundsApi = new RoundsApi(apiInstance);
