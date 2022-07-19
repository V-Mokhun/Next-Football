import { catchError } from "../lib";
import { apiInstance } from "./config";
import { GetCountriesResponse } from "./models";

const COUNTRIES_URL = "countries";

class CountriesApi {
  async getCountries() {
    try {
      const { data } = await apiInstance.get<GetCountriesResponse>(
        COUNTRIES_URL
      );

      return data;
    } catch (error) {
      throw catchError(error);
    }
  }
}

export const countriesApi = new CountriesApi();
