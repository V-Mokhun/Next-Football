import axios from "axios";
import { catchError } from "./lib";
import { ViewerRequestBody } from "./models";

export class BaseApi {
  protected makeUrl(
    apiUrl: string,
    paramsObj: { [key: string]: string | number }
  ) {
    let url = `${apiUrl}?`;
    const params: {[key: string]: string} = {};
    for (const [key, value] of Object.entries(paramsObj)) {
      params[key] = typeof value === "number" ? `${value}` : value
    }
    const queries = new URLSearchParams(params);

    url += queries.toString();

    return url;
  }

  protected async postRequest<T>(body: ViewerRequestBody, url: string) {
    try {
      const { data } = await axios.post<T>(url, body);

      return data;
    } catch (error) {
      throw catchError(error);
    }
  }

  protected async updateRequest<T, F>(body: F, url: string) {
    try {
      const { data } = await axios.patch<T>(url, body);

      return data;
    } catch (error) {
      throw catchError(error);
    }
  }

  protected async getRequest<T>(url: string) {
    try {
      const { data } = await axios.get<T>(url);

      return data;
    } catch (error) {
      throw catchError(error);
    }
  }
}
