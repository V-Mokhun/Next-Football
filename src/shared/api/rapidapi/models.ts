export interface User {
  email: string;
  password: string;
}

interface Team {
  id: number;
  name: string;
  code: string;
  country: string;
  founded: number;
  national: boolean;
  logo: string;
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

interface League {
  id: number;
  name: string;
  type: string;
  logo: string;
}

interface Country {
  name: string;
  code: string;
  flag: string;
}

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
  };
};

export type GetTeamsResponse = ApiResponse & {
  response: { team: Team; venue: Venue }[];
};
