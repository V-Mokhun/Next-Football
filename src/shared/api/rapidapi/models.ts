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

interface Venue {
  id: number;
  name: string;
  address: string;
  city: string;
  capacity: number;
  surface: string;
  image: string;
}

interface Fixtures {
  event: boolean;
  lineups: boolean;
  statistics_fixtures: boolean;
  statistics_players: boolean;
}

interface Coverage {
  standings: boolean;
  players: boolean;
  top_scorers: boolean;
  predictions: boolean;
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

export interface Team {
  id: number;
  name: string;
  code: string;
  country: string;
  founded: number;
  national: boolean;
  logo: string;
}

export type LeagueType = "league" | "cup";
export interface League {
  id: number;
  name: string;
  type: LeagueType;
  logo: string;
}

export interface Country {
  name: string;
  code: string;
  flag: string;
}

export interface Fixture {
  id: number;
  timezone: string;
  date: Date;
  timestamp: number;
  periods: {
    first: number | null;
    second: number | null;
  };
  venue: Pick<Venue, "id" | "name" | "city">;
  status: {
    long: string;
    short: FixtureStatus;
    elapsed: number;
  };
}

export type FixtureTeam = Pick<Team, "id" | "name" | "logo"> & {
  winner: boolean;
};

type ApiResponse = {
  get: string;
  errors: { [key: string]: string }[];
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
export type LeaguesQueryParams = {
  id?: number;
  name?: string;
  country?: string;
  code?: string;
  season?: number;
  team?: number;
};

export type GetTeamsResponse = ApiResponse & {
  response: { team: Team; venue: Venue }[];
};

export type GetCountriesResponse = ApiResponse & {
  response: Country[];
};

export type GetFixturesResponse = ApiResponse & {
  response: {
    fixture: Fixture;
    league: Omit<League, "type"> & {
      country: string;
      flag: string;
      season: number;
      round: string;
    };
    teams: {
      home: FixtureTeam;
      away: FixtureTeam;
    };
    goals: {
      home: number;
      away: number;
    };
    score: {
      halftime: { home: number | null; away: number | null };
      fulltime: { home: number | null; away: number | null };
      extratime: { home: number | null; away: number | null };
      penalty: { home: number | null; away: number | null };
    };
  }[];
};
export type FixturesQueryParams = {
  id?: number;
  live?: "all" | "id-id";
  date?: string;
  league?: number;
  from?: string;
  to?: string;
  timezone?: string;
};

export type HeadToHeadQueryParams = Omit<FixturesQueryParams, "id"> & {
  h2h: string;
};
