import {
  FixtureResponse,
  FixturesQueryParams,
  GetFixturesResponse,
  LeagueResponse,
  rapidApi,
} from "@/shared/api";
import {
  createEffect,
  createEvent,
  createStore,
  restore,
  sample,
} from "effector";

export const leagueSet = createEvent<LeagueResponse | null>();
export const leagueNextFixturesUpdated = createEvent<number>();

export const fetchLeagueFixturesFx = createEffect<
  FixturesQueryParams,
  GetFixturesResponse["response"],
  Error
>(async (params) => {
  const { response } = await rapidApi.fixturesApi.getFixtures(params);

  return response;
});

export const $league = restore<LeagueResponse | null>(leagueSet, {
  league: {
    id: 140,
    name: "La Liga",
    type: "League",
    logo: "https://media.api-sports.io/football/leagues/140.png",
  },
  country: {
    name: "Spain",
    code: "ES",
    flag: "https://media.api-sports.io/flags/es.svg",
  },
  seasons: [
    {
      year: 2022,
      start: "2022-08-12",
      end: "2023-06-04",
      current: true,
      coverage: {
        fixtures: {
          events: false,
          lineups: false,
          statistics_fixtures: false,
          statistics_players: false,
        },
        standings: true,
        players: true,
        top_scorers: true,
        top_assists: true,
        top_cards: true,
        injuries: false,
        predictions: true,
        odds: false,
      },
    },
  ],
});
export const $leagueNextFixtures = restore(leagueNextFixturesUpdated, 1);
export const $leagueFixtures = createStore<FixtureResponse[]>([]);

$leagueFixtures.watch((s) => console.log(s));

sample({
  clock: fetchLeagueFixturesFx.doneData,
  target: $leagueFixtures,
});
