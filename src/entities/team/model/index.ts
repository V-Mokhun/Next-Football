import {
  FixtureResponse,
  GetStandingsResponse,
  LeagueResponse,
  rapidApi,
  Standing,
  StandingsQueryParams,
  TeamResponse,
} from "@/shared/api";
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
import { TeamMatchesLimit, TeamSeason } from "../types";

export const NORMAL_MATCHES_LIMIT: TeamMatchesLimit = 10;
export const EXTENDED_MATCHES_LIMIT: TeamMatchesLimit = 40;

export const todayDate = formatDate(new Date());

export const teamSet = createEvent<number>();
export const fetchTeamSeason = createEvent<number>();
export const fetchTeamStandings = createEvent<number>();
export const lastMatchesCountUpdated = createEvent<TeamMatchesLimit>();
export const nextMatchesCountUpdated = createEvent<TeamMatchesLimit>();

export const fetchTeamFx = createEffect<number, TeamResponse, Error>(
  async (id) => {
    const { response } = await rapidApi.teamsApi.getTeams({ id });

    return response[0];
  }
);

export const fetchTeamLeagueFx = createEffect<
  number,
  LeagueResponse["league"] | null,
  Error
>(async (teamId) => {
  const { response } = await rapidApi.leaguesApi.getLeagues({
    team: teamId,
    current: true,
  });

  return response[0].league || null;
});

export const fetchTeamSeasonFx = createEffect<number, TeamSeason, Error>(
  async (teamId) => {
    const season = await rapidApi.teamsApi.getCurrentSeason(teamId);

    return { season, teamId };
  }
);

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
  TeamSeason & { lastMatches: number },
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
  TeamSeason & { nextMatches: number },
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

export const fetchTeamStandingsFx = createEffect<
  StandingsQueryParams,
  GetStandingsResponse["response"],
  Error
>(async (params) => {
  const { response } = await rapidApi.standingsApi.getStandings(params);

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

export const $teamLeague = restore(fetchTeamLeagueFx.doneData, null);

export const $teamSeason = restore(fetchTeamSeasonFx.doneData, null);

export const $todayMatches = createStore<{
  [key: string]: FixtureResponse[];
} | null>(null).reset(fetchTodayMatchesFx.failData);
export const $todayMatchesLoading = fetchTodayMatchesFx.pending;

export const $lastMatchesCount = restore(
  lastMatchesCountUpdated,
  NORMAL_MATCHES_LIMIT
);
export const $lastMatches = createStore<
  {
    [key: string]: FixtureResponse[];
  }[]
>([]).reset(fetchLastMatchesFx.failData);
export const $lastMatchesLoading = fetchLastMatchesFx.pending;
export const $lastMatchesError = createStore("").reset(fetchLastMatchesFx);

export const $nextMatchesCount = restore(
  nextMatchesCountUpdated,
  NORMAL_MATCHES_LIMIT
);
export const $nextMatches = createStore<
  {
    [key: string]: FixtureResponse[];
  }[]
>([]).reset(fetchNextMatchesFx.failData);
export const $nextMatchesLoading = fetchNextMatchesFx.pending;
export const $nextMatchesError = createStore("").reset(fetchNextMatchesFx);

export const $teamStandings = createStore<Standing[]>([]);
export const $teamStandingsLoading = fetchTeamStandingsFx.pending;
export const $teamStandingsError = createStore("").reset(fetchTeamStandingsFx);

sample({
  clock: teamSet,
  source: $team,
  filter: (team, id) => team != null && team.team.id != id,
  fn: (_, id) => id,
  target: [fetchTeamFx, fetchTeamLeagueFx],
});

sample({
  clock: fetchTeamSeason,
  source: $teamSeason,
  filter: (season) => season == null,
  fn: (_, season) => season,
  target: fetchTeamSeasonFx,
});

sample({
  clock: [fetchTeamStandings, $teamSeason],
  source: { teamSeason: $teamSeason, teamLeague: $teamLeague },
  filter: ({ teamSeason, teamLeague }) =>
    teamSeason != null && teamLeague != null,
  fn: ({ teamSeason, teamLeague }): StandingsQueryParams => ({
    season: teamSeason!.season,
    league: teamLeague!.id,
  }),
  target: fetchTeamStandingsFx,
});

// sample({
//   clock: [$lastMatchesCount, $teamSeason],
//   source: { lastMatches: $lastMatchesCount, season: $teamSeason },
//   filter: ({ season }) => season != null,
//   fn: ({ lastMatches, season }) => ({
//     season: season!.season,
//     teamId: season!.teamId,
//     lastMatches,
//   }),
//   target: fetchLastMatchesFx,
// });

// sample({
//   clock: [$nextMatchesCount, $teamSeason],
//   source: { nextMatches: $nextMatchesCount, season: $teamSeason },
//   filter: ({ season }) => season != null,
//   fn: ({ nextMatches, season }) => ({
//     season: season!.season,
//     teamId: season!.teamId,
//     nextMatches,
//   }),
//   target: fetchNextMatchesFx,
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
  clock: fetchTeamStandingsFx.failData,
  fn: (error) => error.message,
  target: $teamStandingsError,
});

sample({
  clock: fetchTeamSeasonFx.doneData,
  filter: ({ season }) => Boolean(season),
  fn: ({ season, teamId }) => ({ season: season as number, teamId }),
  target: fetchTodayMatchesFx,
});

sample({
  clock: fetchTeamStandingsFx.doneData,
  filter: (standings) => Boolean(standings[0]?.league?.standings[0]),
  fn: (standings): Standing[] => {
    return standings[0].league.standings[0];
  },
  target: $teamStandings,
});

transformFixtures(fetchTodayMatchesFx.doneData, $todayMatches);
transformManyFixtures(fetchLastMatchesFx.doneData, $lastMatches);
transformManyFixtures(fetchNextMatchesFx.doneData, $nextMatches);
