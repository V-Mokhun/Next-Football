import {
  FixtureResponse,
  GetStandingsResponse,
  LeagueResponse,
  rapidApi,
  SquadResponse,
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
export const fetchTeamSquad = createEvent<number>();
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
  LeagueResponse["league"],
  Error
>(async (teamId) => {
  const { response } = await rapidApi.leaguesApi.getLeagues({
    team: teamId,
    current: true,
    type: "league",
  });

  return response[0].league;
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

export const fetchTeamSquadFx = createEffect<number, SquadResponse, Error>(
  async (teamId) => {
    const { response } = await rapidApi.squadsApi.getSquads({ team: teamId });

    return response[0];
  }
);

export const $team = restore(fetchTeamFx.doneData, null);

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

export const $teamSquad = restore(fetchTeamSquadFx.doneData, null);
export const $teamSquadLoading = fetchTeamSquadFx.pending;
export const $teamSquadError = createStore("").reset(fetchTeamSquadFx);

sample({
  clock: teamSet,
  source: $team,
  filter: (team, id) => team?.team.id != id,
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

sample({
  clock: [$lastMatchesCount, $teamSeason],
  source: { lastMatches: $lastMatchesCount, season: $teamSeason },
  filter: ({ season }) => season != null,
  fn: ({ lastMatches, season }) => ({
    season: season!.season,
    teamId: season!.teamId,
    lastMatches,
  }),
  target: fetchLastMatchesFx,
});

sample({
  clock: [$nextMatchesCount, $teamSeason],
  source: { nextMatches: $nextMatchesCount, season: $teamSeason },
  filter: ({ season }) => season != null,
  fn: ({ nextMatches, season }) => ({
    season: season!.season,
    teamId: season!.teamId,
    nextMatches,
  }),
  target: fetchNextMatchesFx,
});

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
  clock: fetchTeamSquadFx.failData,
  fn: (error) => error.message,
  target: $teamSquadError,
});

sample({
  clock: fetchTeamSeasonFx.doneData,
  filter: ({ season }) => Boolean(season),
  fn: ({ season, teamId }) => ({ season: season as number, teamId }),
  target: fetchTodayMatchesFx,
});

sample({
  clock: fetchTeamStandingsFx.doneData,
  filter: (standings) => standings[0]?.league?.standings[0] != null,
  fn: (standings): Standing[] => {
    return standings[0].league.standings[0];
  },
  target: $teamStandings,
});

sample({
  clock: fetchTeamSquad,
  source: { team: $team, teamSquad: $teamSquad },
  filter: ({ team, teamSquad }) => teamSquad?.team.id != team?.team.id,
  fn: (_, id) => id,
  target: fetchTeamSquadFx,
});

transformFixtures(fetchTodayMatchesFx.doneData, $todayMatches);
transformManyFixtures(fetchLastMatchesFx.doneData, $lastMatches);
transformManyFixtures(fetchNextMatchesFx.doneData, $nextMatches);
