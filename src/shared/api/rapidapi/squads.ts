import { BaseApi } from "../base";
import { catchError } from "../lib";
import { apiInstance } from "./config";
import { GetSquadsResponse, SquadsQueryParams } from "./models";

const SQUADS_URL = "players/squads";

class SquadsApi extends BaseApi {
  async getSquads(params: SquadsQueryParams) {
    try {
      const url = this.makeUrl(SQUADS_URL, params);

      const { data } = await apiInstance.get<GetSquadsResponse>(url);
      console.log(data);

      return data;
    } catch (error) {
      throw catchError(error);
    }
  }
}

export const squadsApi = new SquadsApi(apiInstance);
