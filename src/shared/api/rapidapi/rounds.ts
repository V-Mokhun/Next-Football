import { BaseApi } from "../base";
import { apiInstance } from "./config";
import { FixturesQueryParams, GetRoundsResponse } from "./models";

const ROUNDS_URL = "fixtures/rounds";

class RoundsApi extends BaseApi {
  async getRounds(params: FixturesQueryParams) {
    const url = this.makeUrl(ROUNDS_URL, params);
    const data = await this.getRequest<GetRoundsResponse>(url);

    return data;
  }
}

export const roundsApi = new RoundsApi(apiInstance);
