import { FixtureResponse, rapidApi, TeamResponse } from "@/shared/api";
import {
  formatDate,
  transformFixtures,
  transformManyFixtures,
} from "@/shared/lib";
import {
  createEffect,
  createEvent,
  createStore,
  restore,
  sample,
} from "effector";

export const todayDate = formatDate(new Date());

export const teamSet = createEvent<number>();
export const fetchTeamSeason = createEvent<number>();
export const lastMatchesCountUpdated = createEvent<number>();
export const nextMatchesCountUpdated = createEvent<number>();

export const fetchTeamFx = createEffect<number, TeamResponse, Error>(
  async (id) => {
    const { response } = await rapidApi.teamsApi.getTeams({ id });

    return response[0];
  }
);

export const fetchTeamSeasonFx = createEffect<
  number,
  { teamId: number; season: number },
  Error
>(async (teamId) => {
  const season = await rapidApi.teamsApi.getCurrentSeason(teamId);

  return { season, teamId };
});

export const fetchTodayMatchesFx = createEffect<
  { teamId: number; season: number },
  FixtureResponse[],
  Error
>(async ({ season, teamId }) => {
  const { response } = await rapidApi.fixturesApi.getFixtures({
    team: teamId,
    date: todayDate,
    season,
  });

  return response;
});

export const fetchLastMatchesFx = createEffect<
  { teamId: number; season: number; lastMatches: number },
  FixtureResponse[],
  Error
>(async ({ season, teamId, lastMatches }) => {
  const { response } = await rapidApi.fixturesApi.getFixtures({
    team: teamId,
    season,
    last: lastMatches,
  });

  return response;
});

export const fetchNextMatchesFx = createEffect<
  { teamId: number; season: number; nextMatches: number },
  FixtureResponse[],
  Error
>(async ({ season, teamId, nextMatches }) => {
  const { response } = await rapidApi.fixturesApi.getFixtures({
    team: teamId,
    season,
    next: nextMatches,
  });

  return response;
});

export const $team = restore(fetchTeamFx.doneData, {
  team: {
    id: 33,
    name: "Manchester United",
    code: "MUN",
    country: "England",
    founded: 1878,
    national: false,
    logo: "https://media.api-sports.io/football/teams/33.png",
  },
  venue: {
    id: 556,
    name: "Old Trafford",
    address: "Sir Matt Busby Way",
    city: "Manchester",
    capacity: 76212,
    surface: "grass",
    image: "https://media.api-sports.io/football/venues/556.png",
  },
});

export const $teamSeason = restore(fetchTeamSeasonFx.doneData, null);

export const $todayMatches = createStore<{
  [key: string]: FixtureResponse[];
} | null>(null).reset(fetchTodayMatchesFx.failData);
export const $todayMatchesLoading = fetchTodayMatchesFx.pending;

export const $lastMatchesCount = restore(lastMatchesCountUpdated, 10);
export const $lastMatches = createStore<
  {
    [key: string]: FixtureResponse[];
  }[]
>([]).reset(fetchLastMatchesFx.failData);
export const $lastMatchesLoading = fetchLastMatchesFx.pending;
export const $lastMatchesError = createStore("").reset(fetchLastMatchesFx);

export const $nextMatchesCount = restore(nextMatchesCountUpdated, 10);
export const $nextMatches = createStore<
  {
    [key: string]: FixtureResponse[];
  }[]
>([]).reset(fetchNextMatchesFx.failData);
export const $nextMatchesLoading = fetchNextMatchesFx.pending;
export const $nextMatchesError = createStore("").reset(fetchNextMatchesFx);

// sample({
//   clock: teamSet,
//   target: fetchTeamFx,
// });

// sample({
//   clock: fetchTeamSeason,
//   target: fetchTeamSeasonFx,
// });

sample({
  clock: fetchLastMatchesFx.failData,
  fn: (error) => error.message,
  target: $lastMatchesError,
});

sample({
  clock: fetchNextMatchesFx.failData,
  fn: (error) => error.message,
  target: $nextMatchesError,
});

sample({
  clock: fetchTeamSeasonFx.doneData,
  filter: ({ season }) => Boolean(season),
  fn: ({ season, teamId }) => ({ season: season as number, teamId }),
  target: fetchTodayMatchesFx,
});

sample({
  clock: fetchTeamSeasonFx.doneData,
  source: $lastMatchesCount,
  filter: (_, { season }) => Boolean(season),
  fn: (lastMatches, { season, teamId }) => ({
    season: season as number,
    teamId,
    lastMatches,
  }),
  target: fetchLastMatchesFx,
});

sample({
  clock: fetchTeamSeasonFx.doneData,
  source: $nextMatchesCount,
  filter: (_, { season }) => Boolean(season),
  fn: (nextMatches, { season, teamId }) => ({
    season: season as number,
    teamId,
    nextMatches,
  }),
  target: fetchNextMatchesFx,
});

transformFixtures(fetchTodayMatchesFx.doneData, $todayMatches);
transformManyFixtures(fetchLastMatchesFx.doneData, $lastMatches);
transformManyFixtures(fetchNextMatchesFx.doneData, $nextMatches);
