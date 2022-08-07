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

export const $teamLeague = restore(fetchTeamLeagueFx.doneData, {
  id: 39,
  name: "Premier League",
  type: "League",
  logo: "https://media.api-sports.io/football/leagues/39.png",
});

export const $teamSeason = restore(fetchTeamSeasonFx.doneData, {
  season: 2022,
  teamId: 33,
});

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

export const $teamSquad = restore(fetchTeamSquadFx.doneData, {
  team: {
    id: 33,
    name: "Manchester United",
    logo: "https://media.api-sports.io/football/teams/33.png",
  },
  players: [
    {
      id: 20319,
      name: "N. Bishop",
      age: 23,
      number: null,
      position: "Goalkeeper",
      photo: "https://media.api-sports.io/football/players/20319.png",
    },
    {
      id: 882,
      name: "David de Gea",
      age: 32,
      number: 1,
      position: "Goalkeeper",
      photo: "https://media.api-sports.io/football/players/882.png",
    },
    {
      id: 2931,
      name: "T. Heaton",
      age: 36,
      number: 22,
      position: "Goalkeeper",
      photo: "https://media.api-sports.io/football/players/2931.png",
    },
    {
      id: 138804,
      name: "M. Kovář",
      age: 22,
      number: null,
      position: "Goalkeeper",
      photo: "https://media.api-sports.io/football/players/138804.png",
    },
    {
      id: 885,
      name: "E. Bailly",
      age: 28,
      number: 3,
      position: "Defender",
      photo: "https://media.api-sports.io/football/players/885.png",
    },
    {
      id: 886,
      name: "Diogo Dalot",
      age: 23,
      number: 20,
      position: "Defender",
      photo: "https://media.api-sports.io/football/players/886.png",
    },
    {
      id: 153434,
      name: "W. Fish",
      age: 19,
      number: null,
      position: "Defender",
      photo: "https://media.api-sports.io/football/players/153434.png",
    },
    {
      id: 888,
      name: "P. Jones",
      age: 30,
      number: 4,
      position: "Defender",
      photo: "https://media.api-sports.io/football/players/888.png",
    },
    {
      id: 138775,
      name: "E. Laird",
      age: 21,
      number: null,
      position: "Defender",
      photo: "https://media.api-sports.io/football/players/138775.png",
    },
    {
      id: 2935,
      name: "H. Maguire",
      age: 29,
      number: 5,
      position: "Defender",
      photo: "https://media.api-sports.io/football/players/2935.png",
    },
    {
      id: 37145,
      name: "T. Malacia",
      age: 23,
      number: null,
      position: "Defender",
      photo: "https://media.api-sports.io/football/players/37145.png",
    },
    {
      id: 2467,
      name: "L. Martínez",
      age: 24,
      number: null,
      position: "Defender",
      photo: "https://media.api-sports.io/football/players/2467.png",
    },
    {
      id: 153429,
      name: "T. Mengi",
      age: 20,
      number: null,
      position: "Defender",
      photo: "https://media.api-sports.io/football/players/153429.png",
    },
    {
      id: 889,
      name: "V. Lindelöf",
      age: 28,
      number: 2,
      position: "Defender",
      photo: "https://media.api-sports.io/football/players/889.png",
    },
    {
      id: 891,
      name: "L. Shaw",
      age: 27,
      number: 23,
      position: "Defender",
      photo: "https://media.api-sports.io/football/players/891.png",
    },
    {
      id: 378,
      name: "Alex Telles",
      age: 30,
      number: 27,
      position: "Defender",
      photo: "https://media.api-sports.io/football/players/378.png",
    },
    {
      id: 19182,
      name: "A. Tuanzebe",
      age: 25,
      number: null,
      position: "Defender",
      photo: "https://media.api-sports.io/football/players/19182.png",
    },
    {
      id: 742,
      name: "R. Varane",
      age: 29,
      number: 19,
      position: "Defender",
      photo: "https://media.api-sports.io/football/players/742.png",
    },
    {
      id: 18846,
      name: "A. Wan-Bissaka",
      age: 25,
      number: 29,
      position: "Defender",
      photo: "https://media.api-sports.io/football/players/18846.png",
    },
    {
      id: 138806,
      name: "B. Williams",
      age: 22,
      number: 33,
      position: "Defender",
      photo: "https://media.api-sports.io/football/players/138806.png",
    },
    {
      id: 1485,
      name: "Bruno Fernandes",
      age: 28,
      number: 18,
      position: "Midfielder",
      photo: "https://media.api-sports.io/football/players/1485.png",
    },
    {
      id: 906,
      name: "T. Chong",
      age: 23,
      number: 44,
      position: "Midfielder",
      photo: "https://media.api-sports.io/football/players/906.png",
    },
    {
      id: 174,
      name: "C. Eriksen",
      age: 30,
      number: null,
      position: "Midfielder",
      photo: "https://media.api-sports.io/football/players/174.png",
    },
    {
      id: 895,
      name: "J. Garner",
      age: 21,
      number: null,
      position: "Midfielder",
      photo: "https://media.api-sports.io/football/players/895.png",
    },
    {
      id: 284295,
      name: "Zidane Iqbal",
      age: 19,
      number: null,
      position: "Midfielder",
      photo: "https://media.api-sports.io/football/players/284295.png",
    },
    {
      id: 903,
      name: "S. McTominay",
      age: 26,
      number: 39,
      position: "Midfielder",
      photo: "https://media.api-sports.io/football/players/903.png",
    },
    {
      id: 180560,
      name: "H. Mejbri",
      age: 19,
      number: 46,
      position: "Midfielder",
      photo: "https://media.api-sports.io/football/players/180560.png",
    },
    {
      id: 70078,
      name: "F. Pellistri",
      age: 21,
      number: null,
      position: "Midfielder",
      photo: "https://media.api-sports.io/football/players/70078.png",
    },
    {
      id: 905,
      name: "Fred",
      age: 29,
      number: 17,
      position: "Midfielder",
      photo: "https://media.api-sports.io/football/players/905.png",
    },
    {
      id: 284323,
      name: "C. Savage",
      age: 19,
      number: 72,
      position: "Midfielder",
      photo: "https://media.api-sports.io/football/players/284323.png",
    },
    {
      id: 547,
      name: "D. van de Beek",
      age: 25,
      number: 34,
      position: "Midfielder",
      photo: "https://media.api-sports.io/football/players/547.png",
    },
    {
      id: 874,
      name: "Cristiano Ronaldo dos Santos Aveiro",
      age: 37,
      number: 7,
      position: "Attacker",
      photo: "https://media.api-sports.io/football/players/874.png",
    },
    {
      id: 284324,
      name: "A. Garnacho",
      age: 18,
      number: 75,
      position: "Attacker",
      photo: "https://media.api-sports.io/football/players/284324.png",
    },
    {
      id: 153430,
      name: "A. Elanga",
      age: 20,
      number: 36,
      position: "Attacker",
      photo: "https://media.api-sports.io/football/players/153430.png",
    },
    {
      id: 908,
      name: "A. Martial",
      age: 27,
      number: 9,
      position: "Attacker",
      photo: "https://media.api-sports.io/football/players/908.png",
    },
    {
      id: 909,
      name: "M. Rashford",
      age: 25,
      number: 10,
      position: "Attacker",
      photo: "https://media.api-sports.io/football/players/909.png",
    },
    {
      id: 18,
      name: "J. Sancho",
      age: 22,
      number: 25,
      position: "Attacker",
      photo: "https://media.api-sports.io/football/players/18.png",
    },
    {
      id: 157997,
      name: "A. Diallo",
      age: 20,
      number: 16,
      position: "Attacker",
      photo: "https://media.api-sports.io/football/players/157997.png",
    },
  ],
} as SquadResponse);
export const $teamSquadLoading = fetchTeamSquadFx.pending;
export const $teamSquadError = createStore("").reset(fetchTeamSquadFx);

// sample({
//   clock: teamSet,
//   source: $team,
//   filter: (team, id) => team?.team.id != id,
//   fn: (_, id) => id,
//   target: [fetchTeamFx, fetchTeamLeagueFx],
// });

// sample({
//   clock: fetchTeamSeason,
//   source: $teamSeason,
//   filter: (season) => season == null,
//   fn: (_, season) => season,
//   target: fetchTeamSeasonFx,
// });

// sample({
//   clock: [fetchTeamStandings, $teamSeason],
//   source: { teamSeason: $teamSeason, teamLeague: $teamLeague },
//   filter: ({ teamSeason, teamLeague }) =>
//     teamSeason != null && teamLeague != null,
//   fn: ({ teamSeason, teamLeague }): StandingsQueryParams => ({
//     season: teamSeason!.season,
//     league: teamLeague!.id,
//   }),
//   target: fetchTeamStandingsFx,
// });

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
