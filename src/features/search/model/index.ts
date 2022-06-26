import {
  combine,
  createEffect,
  createEvent,
  createStore,
  forward,
  restore,
} from "effector-next";
import { GetLeaguesResponse, GetTeamsResponse, rapidApi } from "@/shared/api";

type SearchModeStore = "leagues" | "teams";

export const changeSearch = createEvent<string>();
const changeSearchMode = createEvent<SearchModeStore>();
export const resetItems = createEvent();
export const leaguesButtonClicked = createEvent("leagues");
export const teamsButtonClicked = createEvent("teams");

forward({
  from: leaguesButtonClicked.map(() => "leagues" as SearchModeStore),
  to: changeSearchMode,
});

forward({
  from: teamsButtonClicked.map(() => "teams" as SearchModeStore),
  to: changeSearchMode,
});

export const fetchLeaguesFx = createEffect<string, GetLeaguesResponse, Error>(
  async (query) => {
    const response = await rapidApi.searchApi.searchLeagues(query);
    return response;
  }
);

export const fetchTeamsFx = createEffect<string, GetTeamsResponse, Error>(
  async (query) => {
    const response = await rapidApi.searchApi.searchTeams(query);
    return response;
  }
);

export const $search = restore(changeSearch, "").reset(changeSearchMode);
export const $searchMode = restore(changeSearchMode, "leagues");

export const $leagues = createStore<GetLeaguesResponse["response"]>([])
  .on(fetchLeaguesFx.doneData, (_, { response }) => response.slice(0, 20))
  .on(resetItems, (leagues) => {
    if (leagues.length > 0) return [];
    return leagues;
  });

export const $teams = createStore<GetTeamsResponse["response"]>([])
  .on(fetchTeamsFx.doneData, (_, { response }) => response.slice(0, 20))
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
