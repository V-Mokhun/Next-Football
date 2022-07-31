import { FixtureResponse, rapidApi, TeamResponse } from "@/shared/api";
import { formatDate, transformFixtures } from "@/shared/lib";
import {
  createEffect,
  createEvent,
  createStore,
  forward,
  restore,
  sample,
} from "effector";

export const todayDate = formatDate(new Date());

export const teamSet = createEvent<number>();
export const fetchTeamSeason = createEvent<number>();

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

// forward({
//   from: teamSet,
//   to: fetchTeamFx,
// });

forward({
  from: fetchTeamSeason,
  to: fetchTeamSeasonFx,
});

sample({
  clock: fetchTeamSeasonFx.doneData,
  fn: ({ season, teamId }) => ({ season: season as number, teamId }),
  target: fetchTodayMatchesFx,
});

transformFixtures(fetchTodayMatchesFx.doneData, $todayMatches);
