import {
  GetLeaguesResponse,
  GetTeamsResponse,
  LeagueResponse,
  rapidApi,
} from "@/shared/api";
import {
  combine,
  createEffect,
  createEvent,
  createStore,
  restore,
  sample,
} from "effector";

type SearchModeStore = "leagues" | "teams";

export const changeSearch = createEvent<string>();
export const changeSearchMode = createEvent<SearchModeStore>();
export const resetItems = createEvent();
export const leaguesButtonClicked = createEvent("leagues");
export const teamsButtonClicked = createEvent("teams");
export const onFetchLeagues = createEvent<string>();
export const onFetchTeams = createEvent<string>();

sample({
  clock: leaguesButtonClicked,
  fn: () => "leagues" as SearchModeStore,
  target: changeSearchMode,
});

sample({
  clock: teamsButtonClicked,
  fn: () => "teams" as SearchModeStore,
  target: changeSearchMode,
});

export const fetchLeaguesFx = createEffect<
  string,
  GetLeaguesResponse["response"],
  Error
>(async (query) => {
  const { response } = await rapidApi.searchApi.searchLeagues(query);
  return response;
});

export const fetchTeamsFx = createEffect<
  string,
  GetTeamsResponse["response"],
  Error
>(async (query) => {
  const { response } = await rapidApi.searchApi.searchTeams(query);
  return response;
});

sample({
  clock: onFetchLeagues,
  target: fetchLeaguesFx,
});

sample({
  clock: onFetchTeams,
  target: fetchTeamsFx,
});

export const $search = restore(changeSearch, "");
export const $searchMode = restore(changeSearchMode, "leagues");
export const $searchError = createStore("").reset([
  fetchLeaguesFx.doneData,
  fetchTeamsFx.doneData,
]);

export const $leagues = createStore<LeagueResponse[]>([])
  .on(fetchLeaguesFx.doneData, (_, response) => response.slice(0, 20))
  .on(resetItems, (leagues) => {
    if (leagues.length > 0) return [];
    return leagues;
  });

export const $teams = createStore<GetTeamsResponse["response"]>([])
  .on(fetchTeamsFx.doneData, (_, response) => response.slice(0, 20))
  .on(resetItems, (teams) => {
    if (teams.length > 0) return [];
    return teams;
  });

const $leaguesLoading = fetchLeaguesFx.pending;
const $teamsLoading = fetchTeamsFx.pending;

export const $searchLoading = combine(
  [$leaguesLoading, $teamsLoading],
  ([$leaguesLoading, $teamsLoading]) => $leaguesLoading || $teamsLoading
);

sample({
  clock: [fetchLeaguesFx.failData, fetchTeamsFx.failData],
  fn: (error) => error.message,
  target: $searchError,
});
