import {
  FixtureResponse,
  FixturesQueryParams,
  FixtureStatus,
  GetFixturesResponse,
  rapidApi,
} from "@/shared/api";
import { createEffect, createEvent, createStore, sample } from "effector";

export const liveFixturesSelected = createEvent();
export const allFixturesSelected = createEvent();

export const fetchFixturesFx = createEffect<
  FixturesQueryParams,
  GetFixturesResponse["response"],
  Error
>(async (params) => {
  const { response } = await rapidApi.fixturesApi.getFixtures(params);

  return response;
});

export const $isLiveFixtures =
  createStore<boolean>(false).reset(allFixturesSelected);
export const $buttonsDisabled = createStore<boolean>(false);

export const $fixtures = createStore<{ [key: string]: FixtureResponse[] }[]>([
  // TODO: Remove
  {
    "UEFA Champions League": [
      {
        fixture: {
          id: 897743,
          timezone: "Europe/Kiev",
          date: "2022-07-27T19:00:00+03:00",
          timestamp: 1658937600,
          periods: {
            first: null,
            second: null,
          },
          venue: {
            id: 1175,
            name: "Aspmyra Stadion",
            city: "Bodø",
          },
          status: {
            long: "Not Started",
            short: FixtureStatus.NS,
            elapsed: null,
          },
        },
        league: {
          id: 2,
          name: "UEFA Champions League",
          country: "World",
          logo: "https://media.api-sports.io/football/leagues/2.png",
          flag: null,
          season: 2022,
          round: "2nd Qualifying Round",
        },
        teams: {
          home: {
            id: 327,
            name: "Bodo/Glimt",
            logo: "https://media.api-sports.io/football/teams/327.png",
            winner: null,
          },
          away: {
            id: 583,
            name: "Linfield",
            logo: "https://media.api-sports.io/football/teams/583.png",
            winner: null,
          },
        },
        goals: {
          home: null,
          away: null,
        },
        score: {
          halftime: {
            home: null,
            away: null,
          },
          fulltime: {
            home: null,
            away: null,
          },
          extratime: {
            home: null,
            away: null,
          },
          penalty: {
            home: null,
            away: null,
          },
        },
      },
      {
        fixture: {
          id: 867218,
          timezone: "Europe/Kiev",
          date: "2022-07-27T20:00:00+03:00",
          timestamp: 1658941200,
          periods: {
            first: null,
            second: null,
          },
          venue: {
            id: 1581,
            name: "Ülker Stadyumu Fenerbahçe Şükrü Saracoğlu Spor Kompleksi",
            city: "İstanbul",
          },
          status: {
            long: "Not Started",
            short: FixtureStatus.NS,
            elapsed: null,
          },
        },
        league: {
          id: 2,
          name: "UEFA Champions League",
          country: "World",
          logo: "https://media.api-sports.io/football/leagues/2.png",
          flag: null,
          season: 2022,
          round: "2nd Qualifying Round",
        },
        teams: {
          home: {
            id: 611,
            name: "Fenerbahce",
            logo: "https://media.api-sports.io/football/teams/611.png",
            winner: null,
          },
          away: {
            id: 572,
            name: "Dynamo Kyiv",
            logo: "https://media.api-sports.io/football/teams/572.png",
            winner: null,
          },
        },
        goals: {
          home: null,
          away: null,
        },
        score: {
          halftime: {
            home: null,
            away: null,
          },
          fulltime: {
            home: null,
            away: null,
          },
          extratime: {
            home: null,
            away: null,
          },
          penalty: {
            home: null,
            away: null,
          },
        },
      },
      {
        fixture: {
          id: 897749,
          timezone: "Europe/Kiev",
          date: "2022-07-27T20:00:00+03:00",
          timestamp: 1658941200,
          periods: {
            first: null,
            second: null,
          },
          venue: {
            id: 1518,
            name: "Eleda Stadion",
            city: "Malmö",
          },
          status: {
            long: "Not Started",
            short: FixtureStatus.NS,
            elapsed: null,
          },
        },
        league: {
          id: 2,
          name: "UEFA Champions League",
          country: "World",
          logo: "https://media.api-sports.io/football/leagues/2.png",
          flag: null,
          season: 2022,
          round: "2nd Qualifying Round",
        },
        teams: {
          home: {
            id: 375,
            name: "Malmo FF",
            logo: "https://media.api-sports.io/football/teams/375.png",
            winner: null,
          },
          away: {
            id: 586,
            name: "FK Zalgiris Vilnius",
            logo: "https://media.api-sports.io/football/teams/586.png",
            winner: null,
          },
        },
        goals: {
          home: null,
          away: null,
        },
        score: {
          halftime: {
            home: null,
            away: null,
          },
          fulltime: {
            home: null,
            away: null,
          },
          extratime: {
            home: null,
            away: null,
          },
          penalty: {
            home: null,
            away: null,
          },
        },
      },
      {
        fixture: {
          id: 897751,
          timezone: "Europe/Kiev",
          date: "2022-07-27T20:00:00+03:00",
          timestamp: 1658941200,
          periods: {
            first: null,
            second: null,
          },
          venue: {
            id: 1533,
            name: "Stadion Letzigrund",
            city: "Zürich",
          },
          status: {
            long: "Not Started",
            short: FixtureStatus.NS,
            elapsed: null,
          },
        },
        league: {
          id: 2,
          name: "UEFA Champions League",
          country: "World",
          logo: "https://media.api-sports.io/football/leagues/2.png",
          flag: null,
          season: 2022,
          round: "2nd Qualifying Round",
        },
        teams: {
          home: {
            id: 783,
            name: "FC Zurich",
            logo: "https://media.api-sports.io/football/teams/783.png",
            winner: null,
          },
          away: {
            id: 556,
            name: "Qarabag",
            logo: "https://media.api-sports.io/football/teams/556.png",
            winner: null,
          },
        },
        goals: {
          home: null,
          away: null,
        },
        score: {
          halftime: {
            home: null,
            away: null,
          },
          fulltime: {
            home: null,
            away: null,
          },
          extratime: {
            home: null,
            away: null,
          },
          penalty: {
            home: null,
            away: null,
          },
        },
      },
      {
        fixture: {
          id: 897741,
          timezone: "Europe/Kiev",
          date: "2022-07-27T21:30:00+03:00",
          timestamp: 1658946600,
          periods: {
            first: null,
            second: null,
          },
          venue: {
            id: 11914,
            name: "Štadión Tehelné pole",
            city: "Bratislava",
          },
          status: {
            long: "Not Started",
            short: FixtureStatus.NS,
            elapsed: null,
          },
        },
        league: {
          id: 2,
          name: "UEFA Champions League",
          country: "World",
          logo: "https://media.api-sports.io/football/leagues/2.png",
          flag: null,
          season: 2022,
          round: "2nd Qualifying Round",
        },
        teams: {
          home: {
            id: 656,
            name: "Slovan Bratislava",
            logo: "https://media.api-sports.io/football/teams/656.png",
            winner: null,
          },
          away: {
            id: 651,
            name: "Ferencvarosi TC",
            logo: "https://media.api-sports.io/football/teams/651.png",
            winner: null,
          },
        },
        goals: {
          home: null,
          away: null,
        },
        score: {
          halftime: {
            home: null,
            away: null,
          },
          fulltime: {
            home: null,
            away: null,
          },
          extratime: {
            home: null,
            away: null,
          },
          penalty: {
            home: null,
            away: null,
          },
        },
      },
      {
        fixture: {
          id: 867214,
          timezone: "Europe/Kiev",
          date: "2022-07-27T22:00:00+03:00",
          timestamp: 1658948400,
          periods: {
            first: null,
            second: null,
          },
          venue: {
            id: null,
            name: "Stadio Georgios Karaiskáki",
            city: "Piraeus",
          },
          status: {
            long: "Not Started",
            short: FixtureStatus.NS,
            elapsed: null,
          },
        },
        league: {
          id: 2,
          name: "UEFA Champions League",
          country: "World",
          logo: "https://media.api-sports.io/football/leagues/2.png",
          flag: null,
          season: 2022,
          round: "2nd Qualifying Round",
        },
        teams: {
          home: {
            id: 553,
            name: "Olympiakos Piraeus",
            logo: "https://media.api-sports.io/football/teams/553.png",
            winner: null,
          },
          away: {
            id: 4195,
            name: "Maccabi Haifa",
            logo: "https://media.api-sports.io/football/teams/4195.png",
            winner: null,
          },
        },
        goals: {
          home: null,
          away: null,
        },
        score: {
          halftime: {
            home: null,
            away: null,
          },
          fulltime: {
            home: null,
            away: null,
          },
          extratime: {
            home: null,
            away: null,
          },
          penalty: {
            home: null,
            away: null,
          },
        },
      },
    ],
  },
  {
    "Primera A": [
      {
        fixture: {
          id: 822940,
          timezone: "Europe/Kiev",
          date: "2022-07-27T00:40:00+03:00",
          timestamp: 1658871600,
          periods: {
            first: 1658871600,
            second: 1658875200,
          },
          venue: {
            id: 372,
            name: "Estadio de La Independencia",
            city: "Tunja",
          },
          status: {
            long: "Match Finished",
            short: FixtureStatus.FT,
            elapsed: 90,
          },
        },
        league: {
          id: 239,
          name: "Primera A",
          country: "Colombia",
          logo: "https://media.api-sports.io/football/leagues/239.png",
          flag: "https://media.api-sports.io/flags/co.svg",
          season: 2022,
          round: "Clausura - 4",
        },
        teams: {
          home: {
            id: 1140,
            name: "Patriotas",
            logo: "https://media.api-sports.io/football/teams/1140.png",
            winner: null,
          },
          away: {
            id: 1133,
            name: "Jaguares",
            logo: "https://media.api-sports.io/football/teams/1133.png",
            winner: null,
          },
        },
        goals: {
          home: 0,
          away: 0,
        },
        score: {
          halftime: {
            home: 0,
            away: 0,
          },
          fulltime: {
            home: 0,
            away: 0,
          },
          extratime: {
            home: null,
            away: null,
          },
          penalty: {
            home: null,
            away: null,
          },
        },
      },
    ],
  },
  {
    "League One": [
      {
        fixture: {
          id: 889629,
          timezone: "Europe/Kiev",
          date: "2022-07-27T11:00:00+03:00",
          timestamp: 1658908800,
          periods: {
            first: 1658908800,
            second: null,
          },
          venue: {
            id: null,
            name: "Jiangning Football Training Base Field No.2",
            city: "Nanjing",
          },
          status: {
            long: "First Half",
            short: FixtureStatus["2H"],
            elapsed: 48,
          },
        },
        league: {
          id: 170,
          name: "League One",
          country: "China",
          logo: "https://media.api-sports.io/football/leagues/170.png",
          flag: "https://media.api-sports.io/flags/cn.svg",
          season: 2022,
          round: "Regular Season - 11",
        },
        teams: {
          home: {
            id: 1436,
            name: "Beijing Baxy",
            logo: "https://media.api-sports.io/football/teams/1436.png",
            winner: null,
          },
          away: {
            id: 17265,
            name: "Qingdao Youth Island",
            logo: "https://media.api-sports.io/football/teams/17265.png",
            winner: null,
          },
        },
        goals: {
          home: 0,
          away: 0,
        },
        score: {
          halftime: {
            home: 0,
            away: 0,
          },
          fulltime: {
            home: null,
            away: null,
          },
          extratime: {
            home: null,
            away: null,
          },
          penalty: {
            home: null,
            away: null,
          },
        },
      },
      {
        fixture: {
          id: 889630,
          timezone: "Europe/Kiev",
          date: "2022-07-27T11:00:00+03:00",
          timestamp: 1658908800,
          periods: {
            first: 1658908800,
            second: null,
          },
          venue: {
            id: null,
            name: "Tangshan Nanhu City Football Training Base Field No.3",
            city: "Tangshan",
          },
          status: {
            long: "First Half",
            short: FixtureStatus["1H"],
            elapsed: 18,
          },
        },
        league: {
          id: 170,
          name: "League One",
          country: "China",
          logo: "https://media.api-sports.io/football/leagues/170.png",
          flag: "https://media.api-sports.io/flags/cn.svg",
          season: 2022,
          round: "Regular Season - 11",
        },
        teams: {
          home: {
            id: 5665,
            name: "Jiangxi Liansheng",
            logo: "https://media.api-sports.io/football/teams/5665.png",
            winner: true,
          },
          away: {
            id: 1435,
            name: "Xinjiang Tianshan",
            logo: "https://media.api-sports.io/football/teams/1435.png",
            winner: false,
          },
        },
        goals: {
          home: 1,
          away: 0,
        },
        score: {
          halftime: {
            home: 1,
            away: 0,
          },
          fulltime: {
            home: null,
            away: null,
          },
          extratime: {
            home: null,
            away: null,
          },
          penalty: {
            home: null,
            away: null,
          },
        },
      },
      {
        fixture: {
          id: 889631,
          timezone: "Europe/Kiev",
          date: "2022-07-27T14:30:00+03:00",
          timestamp: 1658921400,
          periods: {
            first: null,
            second: null,
          },
          venue: {
            id: null,
            name: "Dalian Pro Soccer Academy Base",
            city: "Dalian",
          },
          status: {
            long: "Not Started",
            short: FixtureStatus.NS,
            elapsed: null,
          },
        },
        league: {
          id: 170,
          name: "League One",
          country: "China",
          logo: "https://media.api-sports.io/football/leagues/170.png",
          flag: "https://media.api-sports.io/flags/cn.svg",
          season: 2022,
          round: "Regular Season - 11",
        },
        teams: {
          home: {
            id: 5688,
            name: "Suzhou Dongwu",
            logo: "https://media.api-sports.io/football/teams/5688.png",
            winner: null,
          },
          away: {
            id: 5647,
            name: "BIT",
            logo: "https://media.api-sports.io/football/teams/5647.png",
            winner: null,
          },
        },
        goals: {
          home: null,
          away: null,
        },
        score: {
          halftime: {
            home: null,
            away: null,
          },
          fulltime: {
            home: null,
            away: null,
          },
          extratime: {
            home: null,
            away: null,
          },
          penalty: {
            home: null,
            away: null,
          },
        },
      },
    ],
  },
]).reset(fetchFixturesFx.failData);
export const $fixturesError = createStore("");

sample({
  clock: liveFixturesSelected,
  fn: () => true,
  target: $isLiveFixtures,
});
