import {
  FixturesQueryParams,
  FixtureStatus,
  GetFixturesResponse,
  rapidApi
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

export const $isLiveFixtures = createStore<boolean>(false);
export const $fixtures = createStore<GetFixturesResponse["response"]>([
  {
    fixture: {
      id: 840784,
      timezone: "Europe/Kiev",
      date: "2022-07-26T00:00:00+03:00",
      timestamp: 1658782800,
      periods: {
        first: 1658782800,
        second: 1658786400,
      },
      venue: {
        id: 260,
        name: "Estádio Leônidas Sodré de Castro",
        city: "Belém, Pará",
      },
      status: {
        long: "Match Finished",
        short: FixtureStatus.FT,
        elapsed: 90,
      },
    },
    league: {
      id: 75,
      name: "Serie C",
      country: "Brazil",
      logo: "https://media.api-sports.io/football/leagues/75.png",
      flag: "https://media.api-sports.io/flags/br.svg",
      season: 2022,
      round: "Regular Season - 16",
    },
    teams: {
      home: {
        id: 149,
        name: "Paysandu",
        logo: "https://media.api-sports.io/football/teams/149.png",
        winner: null,
      },
      away: {
        id: 137,
        name: "Figueirense",
        logo: "https://media.api-sports.io/football/teams/137.png",
        winner: null,
      },
    },
    goals: {
      home: 1,
      away: 1,
    },
    score: {
      halftime: {
        home: 0,
        away: 0,
      },
      fulltime: {
        home: 1,
        away: 1,
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
      id: 903497,
      timezone: "Europe/Kiev",
      date: "2022-07-26T02:00:00+03:00",
      timestamp: 1658790000,
      periods: {
        first: 1658790000,
        second: 1658793600,
      },
      venue: {
        id: 198,
        name: "Estadio Hernando Siles",
        city: "La Paz",
      },
      status: {
        long: "Match Finished",
        short: FixtureStatus.FT,
        elapsed: 90,
      },
    },
    league: {
      id: 344,
      name: "Primera División",
      country: "Bolivia",
      logo: "https://media.api-sports.io/football/leagues/344.png",
      flag: "https://media.api-sports.io/flags/bo.svg",
      season: 2022,
      round: "Clausura - 5",
    },
    teams: {
      home: {
        id: 3702,
        name: "Bolívar",
        logo: "https://media.api-sports.io/football/teams/3702.png",
        winner: true,
      },
      away: {
        id: 3705,
        name: "Jorge Wilstermann",
        logo: "https://media.api-sports.io/football/teams/3705.png",
        winner: false,
      },
    },
    goals: {
      home: 3,
      away: 0,
    },
    score: {
      halftime: {
        home: 1,
        away: 0,
      },
      fulltime: {
        home: 3,
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
  {
    fixture: {
      id: 844457,
      timezone: "Europe/Kiev",
      date: "2022-07-26T16:00:00+03:00",
      timestamp: 1658840400,
      periods: {
        first: null,
        second: null,
      },
      venue: {
        id: 1063,
        name: "Stadium Sultan Ismail Nasiruddin Shah",
        city: "Kuala Terengganu",
      },
      status: {
        long: "Not Started",
        short: FixtureStatus.NS,
        elapsed: null,
      },
    },
    league: {
      id: 279,
      name: "Premier League",
      country: "Malaysia",
      logo: "https://media.api-sports.io/football/leagues/279.png",
      flag: "https://media.api-sports.io/flags/my.svg",
      season: 2022,
      round: "Regular Season - 13",
    },
    teams: {
      home: {
        id: 2501,
        name: "Terengganu City II",
        logo: "https://media.api-sports.io/football/teams/2501.png",
        winner: null,
      },
      away: {
        id: 2500,
        name: "Pdrm",
        logo: "https://media.api-sports.io/football/teams/2500.png",
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
]);

$fixtures.watch((state) => console.log(state));

sample({
  clock: allFixturesSelected,
  fn: () => false,
  target: $isLiveFixtures,
});

sample({
  clock: liveFixturesSelected,
  fn: () => true,
  target: $isLiveFixtures,
});

sample({
  clock: fetchFixturesFx.doneData,
  target: $fixtures,
});
