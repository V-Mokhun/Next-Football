import {
  FixtureResponse,
  FixturesQueryParams,
  GetRoundsResponse,
  GetStandingsResponse,
  LeagueResponse,
  rapidApi,
  RoundsQueryParams,
  Standing,
  StandingsQueryParams,
} from "@/shared/api";
import { transformFixtures } from "@/shared/lib";
import {
  createEffect,
  createEvent,
  createStore,
  restore,
  sample,
} from "effector";

export const leagueSet = createEvent<number>();
export const currentRoundChanged = createEvent<boolean>();
export const activeRoundSet = createEvent<string>();

export const fetchLeagueFx = createEffect<number, LeagueResponse | null, Error>(
  async (id) => {
    const { response } = await rapidApi.leaguesApi.getLeagues({
      id,
      current: true,
    });

    return response[0] || null;
  }
);

export const fetchLeagueFixturesFx = createEffect<
  FixturesQueryParams,
  FixtureResponse[],
  Error
>(async (params) => {
  const { response } = await rapidApi.fixturesApi.getFixtures(params);

  return response;
});

export const fetchLeagueRoundsFx = createEffect<
  RoundsQueryParams,
  GetRoundsResponse["response"],
  Error
>(async (params) => {
  const { response } = await rapidApi.roundsApi.getRounds(params);

  return response;
});

export const fetchLeagueStandingsFx = createEffect<
  StandingsQueryParams,
  GetStandingsResponse["response"],
  Error
>(async (params) => {
  const { response } = await rapidApi.standingsApi.getStandings(params);

  return response;
});

export const $league = restore(fetchLeagueFx.doneData, null);
export const $leagueRounds = restore(fetchLeagueRoundsFx.doneData, []);
export const $leagueFixtures = createStore<{
  [key: string]: FixtureResponse[];
} | null>(null);
export const $leagueStandings = createStore<Standing[]>([]);

export const $leagueFixturesLoading = fetchLeagueFixturesFx.pending;
export const $leagueStandingsLoading = fetchLeagueStandingsFx.pending;

export const $leagueFixturesError = createStore("").reset(
  fetchLeagueFixturesFx
);
export const $leagueStandingsError = createStore("").reset(
  fetchLeagueStandingsFx
);

export const $isCurrentRound = restore(currentRoundChanged, true);
export const $activeRound = restore(activeRoundSet, null);

sample({
  clock: leagueSet,
  target: fetchLeagueFx,
});

transformFixtures(fetchLeagueFixturesFx.doneData, $leagueFixtures, true);

sample({
  clock: fetchLeagueRoundsFx.doneData,
  fn: (rounds) => rounds[0],
  target: $activeRound,
});

sample({
  clock: fetchLeagueStandingsFx.doneData,
  filter: (standings) => Boolean(standings[0]?.league?.standings[0]),
  fn: (standings): Standing[] => {
    return standings[0].league.standings[0];
  },
  target: $leagueStandings,
});

sample({
  clock: fetchLeagueStandingsFx.failData,
  fn: (error) => error.message,
  target: $leagueStandingsError,
});

sample({
  clock: fetchLeagueFixturesFx.failData,
  fn: (error) => error.message,
  target: $leagueFixturesError,
});
