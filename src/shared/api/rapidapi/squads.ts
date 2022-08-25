import { BaseApi } from "../base";
import { apiInstance } from "./config";
import { GetSquadsResponse, SquadsQueryParams } from "./models";

const SQUADS_URL = "players/squads";

class SquadsApi extends BaseApi {
  async getSquads(params: SquadsQueryParams) {
    const url = this.makeUrl(SQUADS_URL, params);
    const data = await this.getRequest<GetSquadsResponse>(url);

    return data;
  }
}

export const squadsApi = new SquadsApi(apiInstance);
