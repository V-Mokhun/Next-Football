import { BaseApi } from "../base";
import { apiInstance } from "./config";
import { GetCountriesResponse } from "./models";

const COUNTRIES_URL = "countries";

class CountriesApi extends BaseApi {
  async getCountries() {
    const data = await this.getRequest<GetCountriesResponse>(COUNTRIES_URL);

    return data;
  }
}

export const countriesApi = new CountriesApi(apiInstance);
