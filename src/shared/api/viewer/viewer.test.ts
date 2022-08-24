import "@testing-library/jest-dom";
import { AxiosInstance } from "axios";
import { League, Team } from "../models";
import { apiInstance } from "./config";
import { LogoutResponse, MeResponse } from "./models";
import { viewerApi } from "./viewer";

jest.mock("./config");

const mockedApiInstance = apiInstance as jest.Mocked<AxiosInstance>;

describe("Viewer class works", () => {
  test("successfully returns user", async () => {
    const me: MeResponse = {
      success: true,
      data: {
        email: "me@me.com",
        timezone: "Europe/Kiev",
        favoriteLeagues: [],
        favoriteTeams: [],
      },
    };

    mockedApiInstance.get.mockResolvedValueOnce(Promise.resolve({ data: me }));
    const meData = await viewerApi.me();
    expect(meData).toEqual(me);
    expect(mockedApiInstance.get).toHaveBeenCalledTimes(1);
  });

  test("successfully returns user when window is undefined", async () => {
    // @ts-ignore
    delete global.window;
    const me: MeResponse = {
      success: true,
      data: {
        email: "me@me.com",
        timezone: "Europe/Kiev",
        favoriteLeagues: [],
        favoriteTeams: [],
      },
    };

    mockedApiInstance.get.mockResolvedValueOnce(Promise.resolve({ data: me }));
    const meData = await viewerApi.me("cookie");
    expect(meData).toEqual(me);
    expect(mockedApiInstance.get).toHaveBeenCalledTimes(1);
  });

  test("successfully returns error when getting a user", async () => {
    const errorMessage = "An unexpected error happened..";
    mockedApiInstance.get.mockRejectedValueOnce(() => errorMessage);
    const meData = await viewerApi.me().catch((err) => err.message);

    expect(meData).toEqual(errorMessage);
    expect(mockedApiInstance.get).toHaveBeenCalledTimes(1);
  });

  test("successfully logins", async () => {
    const me: MeResponse = {
      success: true,
      data: {
        email: "me@me.com",
        timezone: "Europe/Kiev",
        favoriteLeagues: [],
        favoriteTeams: [],
      },
    };
    mockedApiInstance.post.mockResolvedValueOnce(Promise.resolve({ data: me }));
    const meData = await viewerApi.login({
      email: "me@me.com",
      password: "qwerty",
    });
    expect(meData).toEqual(me);
    expect(mockedApiInstance.post).toHaveBeenCalledTimes(1);
  });

  test("successfully registers", async () => {
    const me: MeResponse = {
      success: true,
      data: {
        email: "me@me.com",
        timezone: "",
        favoriteLeagues: [],
        favoriteTeams: [],
      },
    };
    mockedApiInstance.post.mockResolvedValueOnce(Promise.resolve({ data: me }));
    const meData = await viewerApi.register({
      email: "me@me.com",
      password: "qwerty",
    });
    expect(meData).toEqual(me);
    expect(mockedApiInstance.post).toHaveBeenCalledTimes(1);
  });

  test("successfully logs out", async () => {
    const data: LogoutResponse = {
      success: true,
      data: null,
    };
    mockedApiInstance.post.mockResolvedValueOnce(Promise.resolve({ data }));
    const meData = await viewerApi.logout();
    expect(meData).toEqual(data);
    expect(mockedApiInstance.post).toHaveBeenCalledTimes(1);
  });

  test("successfully returns error when logging out", async () => {
    const errorMessage = "An unexpected error happened..";
    mockedApiInstance.post.mockRejectedValueOnce(() => errorMessage);
    const meData = await viewerApi.logout().catch((err) => err.message);

    expect(meData).toEqual(errorMessage);
    expect(mockedApiInstance.post).toHaveBeenCalledTimes(1);
  });

  test("successfully changes timezone", async () => {
    const timezone = "Europe/Kiev";
    const data = {
      success: true,
      data: timezone,
    };
    mockedApiInstance.patch.mockResolvedValueOnce(Promise.resolve({ data }));
    const meData = await viewerApi.changeTimezone(timezone);
    expect(meData).toEqual(data);
    expect(mockedApiInstance.patch).toHaveBeenCalledTimes(1);
  });

  test("successfully returns error when changing timezone", async () => {
    const errorMessage = "An unexpected error happened..";
    mockedApiInstance.patch.mockRejectedValueOnce(() => errorMessage);
    const meData = await viewerApi
      .changeTimezone("Europe")
      .catch((err) => err.message);

    expect(meData).toEqual(errorMessage);
    expect(mockedApiInstance.patch).toHaveBeenCalledTimes(1);
  });

  test("successfully changes password", async () => {
    const oldPassword = "qwerty";
    const newPassword = "qwerty123";
    const data = {
      success: true,
      data: null,
    };
    mockedApiInstance.patch.mockResolvedValueOnce(Promise.resolve({ data }));
    const meData = await viewerApi.changePassword({ oldPassword, newPassword });

    expect(meData).toEqual(data);
    expect(mockedApiInstance.patch).toHaveBeenCalledTimes(1);
  });

  test("successfully returns error when changing password", async () => {
    const oldPassword = "qwerty";
    const newPassword = "qwerty123";
    const errorMessage = "An unexpected error happened..";
    mockedApiInstance.patch.mockRejectedValueOnce(() => errorMessage);
    const meData = await viewerApi
      .changePassword({
        newPassword,
        oldPassword,
      })
      .catch((err) => err.message);

    expect(meData).toEqual(errorMessage);
    expect(mockedApiInstance.patch).toHaveBeenCalledTimes(1);
  });

  test("successfully adds favorite league", async () => {
    const league: League = {
      id: 1,
      logo: "sss",
      name: "Premier",
      type: "League",
    };
    const data = {
      success: true,
      data: [league],
    };
    mockedApiInstance.patch.mockResolvedValueOnce(Promise.resolve({ data }));
    const meData = await viewerApi.addFavoriteLeague(league);

    expect(meData).toEqual(data);
    expect(mockedApiInstance.patch).toHaveBeenCalledTimes(1);
  });

  test("successfully deletes favorite league", async () => {
    const data = {
      success: true,
      data: [],
    };
    mockedApiInstance.patch.mockResolvedValueOnce(Promise.resolve({ data }));
    const meData = await viewerApi.removeFavoriteLeague(1);

    expect(meData).toEqual(data);
    expect(mockedApiInstance.patch).toHaveBeenCalledTimes(1);
  });

  test("successfully adds favorite team", async () => {
    const team: Team = {
      id: 1,
      code: "EN",
      country: "England",
      founded: 1922,
      logo: "ss",
      name: "Manchester",
      national: true,
    };
    const data = {
      success: true,
      data: [team],
    };
    mockedApiInstance.patch.mockResolvedValueOnce(Promise.resolve({ data }));
    const meData = await viewerApi.addFavoriteTeam(team);

    expect(meData).toEqual(data);
    expect(mockedApiInstance.patch).toHaveBeenCalledTimes(1);
  });

  test("successfully deletes favorite team", async () => {
    const data = {
      success: true,
      data: [],
    };
    mockedApiInstance.patch.mockResolvedValueOnce(Promise.resolve({ data }));
    const meData = await viewerApi.removeFavoriteTeam(1);

    expect(meData).toEqual(data);
    expect(mockedApiInstance.patch).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
