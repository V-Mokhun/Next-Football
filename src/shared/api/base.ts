import { AxiosInstance } from "axios";
import { catchError } from "./lib";
import { ViewerRequestBody } from "./models";

export class BaseApi {
  protected apiInstance: AxiosInstance;

  constructor(apiInstance: AxiosInstance) {
    this.apiInstance = apiInstance;
  }

  protected makeUrl(
    apiUrl: string,
    paramsObj: { [key: string]: string | number | boolean }
  ) {
    let url = `${apiUrl}?`;
    const params: { [key: string]: string } = {};
    for (const [key, value] of Object.entries(paramsObj)) {
      params[key] =
        typeof value === "number" || typeof value === "boolean"
          ? `${value}`
          : value;
    }
    const queries = new URLSearchParams(params);

    url += queries.toString();

    return url;
  }

  protected async postRequest<T, F = ViewerRequestBody>(body: F, url: string) {
    try {
      const { data } = await this.apiInstance.post<T>(url, body);

      return data;
    } catch (error) {
      throw catchError(error);
    }
  }

  protected async updateRequest<T, F = ViewerRequestBody>(
    body: F,
    url: string
  ) {
    try {
      const { data } = await this.apiInstance.patch<T>(url, body);

      return data;
    } catch (error) {
      throw catchError(error);
    }
  }

  protected async getRequest<T>(url: string) {
    try {
      const { data } = await this.apiInstance.get<T>(url);

      return data;
    } catch (error) {
      throw catchError(error);
    }
  }
}
