type Nullable<T> = { [K in keyof T]: T[K] | null };

export enum FixtureStatus {
  TBD = "TBD",
  NS = "NS",
  "1H" = "1H",
  HT = "HT",
  "2H" = "2H",
  ET = "ET",
  P = "P",
  FT = "FT",
  AET = "AET",
  PEN = "PEN",
  BT = "BT",
  SUSP = "SUSP",
  INT = "INT",
  PST = "PST",
  CANC = "CANC",
  ABD = "ABD",
  AWD = "AWD",
  WO = "WO",
  LIVE = "LIVE",
}

export type PlayerPosition =
  | "Goalkeeper"
  | "Defender"
  | "Midfielder"
  | "Attacker";

export type EventType = "Goal" | "Card" | "subst" | "Var";

interface Venue {
  id: number | null;
  name: string;
  address: string;
  city: string;
  capacity: number;
  surface: string;
  image: string;
}

interface Fixtures {
  events: boolean;
  lineups: boolean;
  statistics_fixtures: boolean;
  statistics_players: boolean;
}

interface Coverage {
  standings: boolean;
  players: boolean;
  top_scorers: boolean;
  top_assists: boolean;
  top_cards: boolean;
  predictions: boolean;
  injuries: boolean;
  odds: boolean;
  fixtures: Fixtures;
}

interface Season {
  year: number;
  start: string;
  end: string;
  current: boolean;
  coverage: Coverage;
}

export interface BasicTeam {
  id: number;
  name: string;
  logo: string;
}

export interface Team extends BasicTeam {
  code: string;
  country: string;
  founded: number;
  national: boolean;
}

export type LeagueType = "League" | "Cup";
export interface League {
  id: number;
  name: string;
  logo: string;
  type?: LeagueType;
}

export interface Country {
  name: string;
  code: string;
  flag: string;
}

export interface Player {
  id: number;
  name: string;
  age: number;
  number: number | null;
  position: PlayerPosition;
  photo: string;
}

export interface Fixture {
  id: number;
  timezone: string;
  date: string;
  referee: string | null;
  timestamp: number;
  periods: {
    first: number | null;
    second: number | null;
  };
  venue: Pick<Venue, "id" | "name" | "city">;
  status: {
    long: string;
    short: FixtureStatus;
    elapsed: number | null;
  };
}

export interface Event {
  time: { elapsed: number | null; extra: number | null };
  team: BasicTeam;
  player: Pick<Player, "id" | "name">;
  assist: Nullable<Pick<Player, "id" | "name">>;
  type: EventType;
  detail: string;
  comments: string | null;
}

export interface LineupTeam extends BasicTeam {
  colors: {
    player: {
      primary: string;
      number: string;
      border: string;
    };
    goalkeeper: {
      primary: string;
      number: string;
      border: string;
    };
  };
}
export type LineupPlayerPosition = "G" | "D" | "M" | "F";
export interface LineupStart<TGrid> {
  player: {
    id: number;
    name: string;
    number: number;
    pos: LineupPlayerPosition;
    grid: TGrid;
  };
}
export interface Lineup {
  team: LineupTeam;
  formation: string;
  startXI: LineupStart<string>[];
  substitutes: LineupStart<null>[];
  coach: {
    id: number;
    name: string;
    photo: string;
  };
}

export interface Statistic {
  type: string;
  value: number | string | null;
}

export interface StandingTeamStatistics {
  played: number | null;
  win: number | null;
  draw: number | null;
  lose: number | null;
  goals: {
    for: number | null;
    against: number | null;
  };
}

export interface Standing {
  rank: number;
  team: Pick<Team, "id" | "name" | "logo">;
  points: number | null;
  goalsDiff: number;
  group: string;
  form: null | string;
  status: string;
  description: string | null;
  all: StandingTeamStatistics;
  home: StandingTeamStatistics;
  away: StandingTeamStatistics;
  update: string;
}

export type FixtureTeam = BasicTeam & {
  winner: boolean | null;
};

export type LeagueStanding = {
  league: Omit<League, "type"> & {
    country: string;
    flag: string;
    season: number;
    standings: Standing[][];
  };
};

export type ApiResponse = {
  get: string;
  errors: { [key: string]: string };
  parameters: { [key: string]: string }[];
  paging: {
    current: number;
    total: number;
  };
  results: number;
};

export type GetTimezonesResponse = ApiResponse & {
  response: string[];
};

export type GetLeaguesResponse = ApiResponse & {
  response: {
    league: League;
    country: Country;
    seasons: Season[];
  }[];
};
export type LeagueResponse = GetLeaguesResponse["response"][0];
export type LeaguesQueryParams = {
  id?: number;
  name?: string;
  country?: string;
  code?: string;
  season?: number;
  team?: number;
  current?: boolean;
  type?: Lowercase<LeagueType>;
};

export type GetTeamsResponse = ApiResponse & {
  response: { team: Team; venue: Venue }[];
};
export type TeamResponse = GetTeamsResponse["response"][0];
export type TeamsQueryParams = {
  id?: number;
  name?: string;
  league?: number;
  country?: string;
  code?: string;
  season?: number;
  venue?: string;
  search?: string;
};

export type GetSeasonsResponse = ApiResponse & {
  response: number[];
};

export type GetCountriesResponse = ApiResponse & {
  response: Country[];
};

export type GetRoundsResponse = ApiResponse & {
  response: string[];
};
export type RoundsQueryParams = {
  league: number;
  season: number;
  current?: boolean;
};

export type GetStandingsResponse = ApiResponse & {
  response: LeagueStanding[];
};
export type StandingsQueryParams = {
  league?: number;
  season: number;
  team?: number;
};

export type GetSquadsResponse = ApiResponse & {
  response: {
    team: BasicTeam;
    players: Player[];
  }[];
};
export type SquadResponse = GetSquadsResponse["response"][0];
export type SquadsQueryParams = {
  team?: number;
  player?: number;
};

type GetFixturesBasicResponse = {
  fixture: Fixture;
  league: League & {
    country: string;
    flag: string | null;
    season: number;
    round: string;
  };
  teams: {
    home: FixtureTeam;
    away: FixtureTeam;
  };
  goals: {
    home: number | null;
    away: number | null;
  };
  score: {
    halftime: { home: number | null; away: number | null };
    fulltime: { home: number | null; away: number | null };
    extratime: { home: number | null; away: number | null };
    penalty: { home: number | null; away: number | null };
  };
};
export type GetFixturesResponse = ApiResponse & {
  response: GetFixturesBasicResponse[];
};
export type FixturesQueryParams = {
  id?: number;
  live?: "all" | "id-id";
  date?: string;
  league?: number;
  team?: number;
  from?: string;
  to?: string;
  timezone?: string;
  next?: number;
  last?: number;
  season?: number;
  round?: string;
};
export type FixtureResponse = GetFixturesResponse["response"][0];

export type GetSingleFixtureResponse = ApiResponse & {
  response: [
    GetFixturesBasicResponse & {
      events: Event[];
      lineups: [Lineup, Lineup] | [];
      statistics:
        | [
            { team: BasicTeam; statistics: Statistic[] },
            { team: BasicTeam; statistics: Statistic[] }
          ]
        | [];
    }
  ];
};
export type SingleFixtureQueryParams = {
  id: number;
  timezone?: string;
};
export type SingleFixtureResponse = GetSingleFixtureResponse["response"][0];

export type HeadToHeadQueryParams = Omit<FixturesQueryParams, "id" | "live"> & {
  h2h: string;
};
