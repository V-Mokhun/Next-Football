import "@testing-library/jest-dom";
import { AxiosError, AxiosInstance } from "axios";
import { BaseApi } from "./base";
import { catchApiError, catchError } from "./lib";
import { ApiResponse } from "./models";
import { apiInstance } from "./rapidapi/config";
import { ViewerRequestBody } from "./viewer/models";

jest.mock("./rapidapi/config");

class PublicBaseApi extends BaseApi {
  public makeUrl(
    apiUrl: string,
    paramsObj: { [key: string]: string | number | boolean }
  ) {
    return super.makeUrl(apiUrl, paramsObj);
  }

  public getRequest<T>(url: string) {
    return super.getRequest<T>(url);
  }

  public updateRequest<T, F = ViewerRequestBody>(body: F, url: string) {
    return super.updateRequest<T, F>(body, url);
  }

  public postRequest<T, F = ViewerRequestBody>(body: F, url: string) {
    return super.postRequest<T, F>(body, url);
  }
}

const mockedApiInstance = apiInstance as jest.Mocked<AxiosInstance>;
const baseApi = new PublicBaseApi(mockedApiInstance);

describe("Base Api works", () => {
  test("Successfuly makes an url", async () => {
    const url = "URL";
    const paramsObj = {
      page: 1,
      current: true,
      name: "name",
    };

    const expectedUrl = `${url}?page=1&current=true&name=name`;

    expect(baseApi.makeUrl(url, paramsObj)).toEqual(expectedUrl);
  });

  const errorMessage = "An unexpected error happened..";
  type TestData = {
    bar: string;
  };
  type TestBody = {
    foo: string;
  };

  test("Successfuly sends an error via get request", async () => {
    mockedApiInstance.get.mockRejectedValueOnce(() => errorMessage);

    const response = await baseApi
      .getRequest("some url")
      .catch((err) => err.message);

    expect(response).toEqual(errorMessage);
    expect(mockedApiInstance.get).toHaveBeenCalledTimes(1);
  });

  test("Successfuly sends an error via post request", async () => {
    mockedApiInstance.post.mockRejectedValueOnce(() => errorMessage);

    const response = await baseApi
      .postRequest<TestData, TestBody>({ foo: "some" }, "some url")
      .catch((err) => err.message);

    expect(response).toEqual(errorMessage);
    expect(mockedApiInstance.post).toHaveBeenCalledTimes(1);
  });

  test("Successfuly sends an error via patch request", async () => {
    mockedApiInstance.patch.mockRejectedValueOnce(() => errorMessage);

    const response = await baseApi
      .updateRequest<TestData, TestBody>({ foo: "lol" }, "some url")
      .catch((err) => err.message);

    expect(response).toEqual(errorMessage);
    expect(mockedApiInstance.patch).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});

describe("Catch error works", () => {
  const errorMessage = "Error!!";

  test("Successfully catches error as string", async () => {
    try {
      catchError(errorMessage);
    } catch (error: any) {
      expect(error.message).toEqual(errorMessage);
    }
  });

  test("Successfully catches error as Error with message", async () => {
    const testError = new Error(errorMessage);

    try {
      catchError(testError);
    } catch (error: any) {
      expect(error.message).toEqual(errorMessage);
    }
  });

  test("Successfully catches error as Error without message", async () => {
    const testError = new Error();

    try {
      catchError(testError);
    } catch (error: any) {
      expect(error.message).toEqual("An unexpected error happened..");
    }
  });

  test("Successfully catches error as AxiosError with message", async () => {
    const testError = new AxiosError(errorMessage);

    try {
      catchError(testError);
    } catch (error: any) {
      expect(error.message).toEqual(errorMessage);
    }
  });

  test("Successfully catches error as Error without message", async () => {
    const testError = new AxiosError();

    try {
      catchError(testError);
    } catch (error: any) {
      expect(error.message).toEqual("An unexpected error happened..");
    }
  });
});

describe("Catch API error works", () => {
  test("Successfully throws an error", async () => {
    const errorMessage = "Error!";
    const errors: ApiResponse["errors"] = {
      "Some error": "Some error descr",
    };

    try {
      catchApiError(errors, errorMessage);
    } catch (error: any) {
      expect(error.message).toEqual(errorMessage);
    }
  });
});
