import "@testing-library/jest-dom";
import { AxiosInstance } from "axios";
import { apiInstance } from "./config";
import { countriesApi } from "./countries";
import { fixturesApi } from "./fixtures";
import { leaguesApi } from "./leagues";
import {
  ApiResponse,
  GetCountriesResponse,
  GetFixturesResponse,
  GetLeaguesResponse,
  GetRoundsResponse,
  GetSeasonsResponse,
  GetSquadsResponse,
  GetStandingsResponse,
  GetTeamsResponse,
  GetTimezonesResponse,
} from "./models";
import { roundsApi } from "./rounds";
import { searchApi } from "./search";
import { settingsApi } from "./settings";
import { squadsApi } from "./squads";
import { standingsApi } from "./standings";
import { teamsApi } from "./teams";

jest.mock("./config");

const mockedApiInstance = apiInstance as jest.Mocked<AxiosInstance>;
const apiResponse: ApiResponse = {
  errors: {},
  get: "get",
  paging: { current: 1, total: 1 },
  parameters: [],
  results: 1,
};

describe("Countries class works", () => {
  test("Successfuly get all countries", async () => {
    const data: GetCountriesResponse = {
      response: [{ code: "UA", flag: "sss", name: "Ukraine" }],
      ...apiResponse,
    };
    mockedApiInstance.get.mockResolvedValueOnce(Promise.resolve({ data }));

    const response = await countriesApi.getCountries();

    expect(response).toEqual(data);
    expect(mockedApiInstance.get).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});

describe("Fixtures class works", () => {
  const data: GetFixturesResponse = {
    response: [],
    ...apiResponse,
  };
  beforeEach(() => {
    mockedApiInstance.get.mockResolvedValueOnce(Promise.resolve({ data }));
  });

  test("Successfuly get all fixtures", async () => {
    const response = await fixturesApi.getFixtures({});

    expect(response).toEqual(data);
    expect(mockedApiInstance.get).toHaveBeenCalledTimes(1);
  });

  test("Successfuly get one fixture", async () => {
    const response = await fixturesApi.getSingleFixture({ id: 1 });

    expect(response).toEqual(data);
    expect(mockedApiInstance.get).toHaveBeenCalledTimes(1);
  });

  test("Successfuly get head to head", async () => {
    const response = await fixturesApi.getHeadToHead({ h2h: "1-2" });

    expect(response).toEqual(data);
    expect(mockedApiInstance.get).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});

describe("Leagues class works", () => {
  test("Successfuly get all leagues", async () => {
    const data: GetLeaguesResponse = {
      response: [
        {
          country: {
            code: "EN",
            flag: "sss",
            name: "England",
          },
          league: {
            id: 1,
            logo: "ss",
            name: "Premiere",
            type: "League",
          },
          seasons: [],
        },
      ],
      ...apiResponse,
    };
    mockedApiInstance.get.mockResolvedValueOnce(Promise.resolve({ data }));

    const response = await leaguesApi.getLeagues({});

    expect(response).toEqual(data);
    expect(mockedApiInstance.get).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});

describe("Teams class works", () => {
  test("Successfuly get all teams", async () => {
    const data: GetTeamsResponse = {
      response: [
        {
          team: {
            code: "EN",
            country: "England",
            founded: 1912,
            id: 1,
            logo: "sssjla",
            name: "Manchester",
            national: true,
          },
          venue: {
            address: "sssjl",
            capacity: 212123,
            city: "London",
            id: 1,
            image: "111",
            name: "Venue",
            surface: "sssda",
          },
        },
      ],
      ...apiResponse,
    };
    mockedApiInstance.get.mockResolvedValueOnce(Promise.resolve({ data }));

    const response = await teamsApi.getTeams({ id: 1 });

    expect(response).toEqual(data);
    expect(mockedApiInstance.get).toHaveBeenCalledTimes(1);
  });

  test("Successfuly get current season", async () => {
    const data: GetSeasonsResponse = {
      response: [2020, 2021, 2022],
      ...apiResponse,
    };
    mockedApiInstance.get.mockResolvedValueOnce(Promise.resolve({ data }));

    const response = await teamsApi.getCurrentSeason(1);

    expect(response).toEqual(2022);
    expect(mockedApiInstance.get).toHaveBeenCalledTimes(1);
  });

  test("Successfuly return error when getting seasons", async () => {
    const errMessage = "An unexpected error happened..";
    const data: GetSeasonsResponse = {
      ...apiResponse,
      response: [],
      errors: {
        "some error": errMessage,
      },
    };
    mockedApiInstance.get.mockReturnValueOnce(Promise.resolve({ data }));

    const response = await teamsApi
      .getCurrentSeason(1)
      .catch((err) => err.message);

    expect(response).toEqual(errMessage);
    expect(mockedApiInstance.get).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});

describe("Rounds class works", () => {
  test("Successfuly get all rounds", async () => {
    const data: GetRoundsResponse = {
      response: ["1", "2", "3", "4", "5", "6"],
      ...apiResponse,
    };
    mockedApiInstance.get.mockResolvedValueOnce(Promise.resolve({ data }));

    const response = await roundsApi.getRounds({ id: 1 });

    expect(response).toEqual(data);
    expect(mockedApiInstance.get).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});

describe("Settings class works", () => {
  test("Successfuly get timezones", async () => {
    const data: GetTimezonesResponse = {
      ...apiResponse,
      response: ["timezone 1", "timezone 2"],
    };
    mockedApiInstance.get.mockResolvedValueOnce(Promise.resolve({ data }));

    const response = await settingsApi.getTimezones();

    expect(response).toEqual(data);
    expect(mockedApiInstance.get).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});

describe("Squads class works", () => {
  test("Successfuly get squads", async () => {
    const data: GetSquadsResponse = {
      ...apiResponse,
      response: [
        {
          players: [
            {
              age: 54,
              id: 1,
              name: "name",
              number: 1,
              photo: "url",
              position: "Goalkeeper",
            },
          ],
          team: {
            id: 1,
            logo: "url",
            name: "team name",
          },
        },
      ],
    };
    mockedApiInstance.get.mockResolvedValueOnce(Promise.resolve({ data }));

    const response = await squadsApi.getSquads({ team: 1 });

    expect(response).toEqual(data);
    expect(mockedApiInstance.get).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});

describe("Standings class works", () => {
  test("Successfuly get standings", async () => {
    const data: GetStandingsResponse = {
      ...apiResponse,
      response: [
        {
          league: {
            country: "UK",
            flag: "flag",
            id: 1,
            logo: "url",
            name: "name",
            season: 2022,
            standings: [],
          },
        },
      ],
    };
    mockedApiInstance.get.mockResolvedValueOnce(Promise.resolve({ data }));

    const response = await standingsApi.getStandings({
      season: 2022,
      league: 1,
    });

    expect(response).toEqual(data);
    expect(mockedApiInstance.get).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});

describe("Search class works", () => {
  test("Successfuly get leagues by search", async () => {
    const data: GetLeaguesResponse = {
      response: [
        {
          country: {
            code: "EN",
            flag: "sss",
            name: "England",
          },
          league: {
            id: 1,
            logo: "ss",
            name: "Premiere",
            type: "League",
          },
          seasons: [],
        },
      ],
      ...apiResponse,
    };
    mockedApiInstance.get.mockResolvedValueOnce(Promise.resolve({ data }));

    const response = await searchApi.searchLeagues("some url");

    expect(response).toEqual(data);
    expect(mockedApiInstance.get).toHaveBeenCalledTimes(1);
  });

  test("Successfuly get error searching leagues when no url provided", async () => {
    const errorMessage = "Provide valid search query";

    const response = await searchApi
      .searchLeagues("s")
      .catch((err) => err.message);

    expect(response).toEqual(errorMessage);
    expect(mockedApiInstance.get).toHaveBeenCalledTimes(0);
  });

  test("Successfuly get teams by search", async () => {
    const data: GetTeamsResponse = {
      response: [
        {
          team: {
            code: "EN",
            country: "England",
            founded: 1912,
            id: 1,
            logo: "sssjla",
            name: "Manchester",
            national: true,
          },
          venue: {
            address: "sssjl",
            capacity: 212123,
            city: "London",
            id: 1,
            image: "111",
            name: "Venue",
            surface: "sssda",
          },
        },
      ],
      ...apiResponse,
    };
    mockedApiInstance.get.mockResolvedValueOnce(Promise.resolve({ data }));

    const response = await searchApi.searchTeams("some url");

    expect(response).toEqual(data);
    expect(mockedApiInstance.get).toHaveBeenCalledTimes(1);
  });

  test("Successfuly get error searching teams when no url provided", async () => {
    const errorMessage = "Provide valid search query";

    const response = await searchApi
      .searchTeams("s")
      .catch((err) => err.message);

    expect(response).toEqual(errorMessage);
    expect(mockedApiInstance.get).toHaveBeenCalledTimes(0);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
