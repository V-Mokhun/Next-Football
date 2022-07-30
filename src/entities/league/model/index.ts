import {
  FixtureResponse,
  FixturesQueryParams,
  FixtureStatus,
  GetFixturesResponse,
  GetRoundsResponse,
  GetStandingsResponse,
  LeagueResponse,
  rapidApi,
  RoundsQueryParams,
  Standing,
  StandingsQueryParams,
} from "@/shared/api";
import {
  createEffect,
  createEvent,
  createStore,
  forward,
  restore,
  sample,
} from "effector";

export const leagueSet = createEvent<number>();
export const moreMatchesClicked = createEvent();

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
  GetFixturesResponse["response"],
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

export const $league = restore<LeagueResponse | null>(fetchLeagueFx.doneData, {
  league: {
    id: 140,
    name: "La Liga",
    type: "League",
    logo: "https://media.api-sports.io/football/leagues/140.png",
  },
  country: {
    name: "Spain",
    code: "ES",
    flag: "https://media.api-sports.io/flags/es.svg",
  },
  seasons: [
    {
      year: 2022,
      start: "2022-08-12",
      end: "2023-06-04",
      current: true,
      coverage: {
        fixtures: {
          events: false,
          lineups: false,
          statistics_fixtures: false,
          statistics_players: false,
        },
        standings: true,
        players: true,
        top_scorers: true,
        top_assists: true,
        top_cards: true,
        injuries: false,
        predictions: true,
        odds: false,
      },
    },
  ],
});
export const $leagueRounds = createStore<string[]>(["Regular Season - 1"]);
export const $leagueFixtures = createStore<
  { [key: string]: FixtureResponse[] }[]
>([
  {
    "Regular Season - 1": [
      {
        fixture: {
          id: 877947,
          timezone: "Europe/Kiev",
          date: "2022-08-12T22:00:00+03:00",
          timestamp: 1660330800,
          periods: {
            first: null,
            second: null,
          },
          venue: {
            id: 1486,
            name: "Estadio El Sadar",
            city: "Iruñea",
          },
          status: {
            long: "Not Started",
            short: FixtureStatus.NS,
            elapsed: null,
          },
        },
        league: {
          id: 140,
          name: "La Liga",
          country: "Spain",
          logo: "https://media.api-sports.io/football/leagues/140.png",
          flag: "https://media.api-sports.io/flags/es.svg",
          season: 2022,
          round: "Regular Season - 1",
        },
        teams: {
          home: {
            id: 727,
            name: "Osasuna",
            logo: "https://media.api-sports.io/football/teams/727.png",
            winner: null,
          },
          away: {
            id: 536,
            name: "Sevilla",
            logo: "https://media.api-sports.io/football/teams/536.png",
            winner: null,
          },
        },
        goals: {
          home: null,
          away: null,
        },
        score: {
          halftime: {
            home: null,
            away: null,
          },
          fulltime: {
            home: null,
            away: null,
          },
          extratime: {
            home: null,
            away: null,
          },
          penalty: {
            home: null,
            away: null,
          },
        },
      },
      {
        fixture: {
          id: 877945,
          timezone: "Europe/Kiev",
          date: "2022-08-13T18:00:00+03:00",
          timestamp: 1660402800,
          periods: {
            first: null,
            second: null,
          },
          venue: {
            id: 1467,
            name: "Abanca-Balaídos",
            city: "Vigo",
          },
          status: {
            long: "Not Started",
            short: FixtureStatus.NS,
            elapsed: null,
          },
        },
        league: {
          id: 140,
          name: "La Liga",
          country: "Spain",
          logo: "https://media.api-sports.io/football/leagues/140.png",
          flag: "https://media.api-sports.io/flags/es.svg",
          season: 2022,
          round: "Regular Season - 1",
        },
        teams: {
          home: {
            id: 538,
            name: "Celta Vigo",
            logo: "https://media.api-sports.io/football/teams/538.png",
            winner: null,
          },
          away: {
            id: 540,
            name: "Espanyol",
            logo: "https://media.api-sports.io/football/teams/540.png",
            winner: null,
          },
        },
        goals: {
          home: null,
          away: null,
        },
        score: {
          halftime: {
            home: null,
            away: null,
          },
          fulltime: {
            home: null,
            away: null,
          },
          extratime: {
            home: null,
            away: null,
          },
          penalty: {
            home: null,
            away: null,
          },
        },
      },
      {
        fixture: {
          id: 877950,
          timezone: "Europe/Kiev",
          date: "2022-08-13T20:00:00+03:00",
          timestamp: 1660410000,
          periods: {
            first: null,
            second: null,
          },
          venue: {
            id: 1492,
            name: "Estadio Municipal José Zorrilla",
            city: "Valladolid",
          },
          status: {
            long: "Not Started",
            short: FixtureStatus.NS,
            elapsed: null,
          },
        },
        league: {
          id: 140,
          name: "La Liga",
          country: "Spain",
          logo: "https://media.api-sports.io/football/leagues/140.png",
          flag: "https://media.api-sports.io/flags/es.svg",
          season: 2022,
          round: "Regular Season - 1",
        },
        teams: {
          home: {
            id: 720,
            name: "Valladolid",
            logo: "https://media.api-sports.io/football/teams/720.png",
            winner: null,
          },
          away: {
            id: 533,
            name: "Villarreal",
            logo: "https://media.api-sports.io/football/teams/533.png",
            winner: null,
          },
        },
        goals: {
          home: null,
          away: null,
        },
        score: {
          halftime: {
            home: null,
            away: null,
          },
          fulltime: {
            home: null,
            away: null,
          },
          extratime: {
            home: null,
            away: null,
          },
          penalty: {
            home: null,
            away: null,
          },
        },
      },
      {
        fixture: {
          id: 877943,
          timezone: "Europe/Kiev",
          date: "2022-08-13T22:00:00+03:00",
          timestamp: 1660417200,
          periods: {
            first: null,
            second: null,
          },
          venue: {
            id: 18630,
            name: "Spotify Camp Nou",
            city: "Barcelona",
          },
          status: {
            long: "Not Started",
            short: FixtureStatus.NS,
            elapsed: null,
          },
        },
        league: {
          id: 140,
          name: "La Liga",
          country: "Spain",
          logo: "https://media.api-sports.io/football/leagues/140.png",
          flag: "https://media.api-sports.io/flags/es.svg",
          season: 2022,
          round: "Regular Season - 1",
        },
        teams: {
          home: {
            id: 529,
            name: "Barcelona",
            logo: "https://media.api-sports.io/football/teams/529.png",
            winner: null,
          },
          away: {
            id: 728,
            name: "Rayo Vallecano",
            logo: "https://media.api-sports.io/football/teams/728.png",
            winner: null,
          },
        },
        goals: {
          home: null,
          away: null,
        },
        score: {
          halftime: {
            home: null,
            away: null,
          },
          fulltime: {
            home: null,
            away: null,
          },
          extratime: {
            home: null,
            away: null,
          },
          penalty: {
            home: null,
            away: null,
          },
        },
      },
      {
        fixture: {
          id: 877946,
          timezone: "Europe/Kiev",
          date: "2022-08-14T18:30:00+03:00",
          timestamp: 1660491000,
          periods: {
            first: null,
            second: null,
          },
          venue: {
            id: 11915,
            name: "Estadio Nuevo Mirandilla",
            city: "Cádiz",
          },
          status: {
            long: "Not Started",
            short: FixtureStatus.NS,
            elapsed: null,
          },
        },
        league: {
          id: 140,
          name: "La Liga",
          country: "Spain",
          logo: "https://media.api-sports.io/football/leagues/140.png",
          flag: "https://media.api-sports.io/flags/es.svg",
          season: 2022,
          round: "Regular Season - 1",
        },
        teams: {
          home: {
            id: 724,
            name: "Cadiz",
            logo: "https://media.api-sports.io/football/teams/724.png",
            winner: null,
          },
          away: {
            id: 548,
            name: "Real Sociedad",
            logo: "https://media.api-sports.io/football/teams/548.png",
            winner: null,
          },
        },
        goals: {
          home: null,
          away: null,
        },
        score: {
          halftime: {
            home: null,
            away: null,
          },
          fulltime: {
            home: null,
            away: null,
          },
          extratime: {
            home: null,
            away: null,
          },
          penalty: {
            home: null,
            away: null,
          },
        },
      },
      {
        fixture: {
          id: 877951,
          timezone: "Europe/Kiev",
          date: "2022-08-14T20:30:00+03:00",
          timestamp: 1660498200,
          periods: {
            first: null,
            second: null,
          },
          venue: {
            id: 1497,
            name: "Estadio de Mestalla",
            city: "Valencia",
          },
          status: {
            long: "Not Started",
            short: FixtureStatus.NS,
            elapsed: null,
          },
        },
        league: {
          id: 140,
          name: "La Liga",
          country: "Spain",
          logo: "https://media.api-sports.io/football/leagues/140.png",
          flag: "https://media.api-sports.io/flags/es.svg",
          season: 2022,
          round: "Regular Season - 1",
        },
        teams: {
          home: {
            id: 532,
            name: "Valencia",
            logo: "https://media.api-sports.io/football/teams/532.png",
            winner: null,
          },
          away: {
            id: 547,
            name: "Girona",
            logo: "https://media.api-sports.io/football/teams/547.png",
            winner: null,
          },
        },
        goals: {
          home: null,
          away: null,
        },
        score: {
          halftime: {
            home: null,
            away: null,
          },
          fulltime: {
            home: null,
            away: null,
          },
          extratime: {
            home: null,
            away: null,
          },
          penalty: {
            home: null,
            away: null,
          },
        },
      },
      {
        fixture: {
          id: 877948,
          timezone: "Europe/Kiev",
          date: "2022-08-14T23:00:00+03:00",
          timestamp: 1660507200,
          periods: {
            first: null,
            second: null,
          },
          venue: {
            id: 1459,
            name: "Power Horse Stadium – Estadio de los Juegos Mediterráneos",
            city: "Almería",
          },
          status: {
            long: "Not Started",
            short: FixtureStatus.NS,
            elapsed: null,
          },
        },
        league: {
          id: 140,
          name: "La Liga",
          country: "Spain",
          logo: "https://media.api-sports.io/football/leagues/140.png",
          flag: "https://media.api-sports.io/flags/es.svg",
          season: 2022,
          round: "Regular Season - 1",
        },
        teams: {
          home: {
            id: 723,
            name: "Almeria",
            logo: "https://media.api-sports.io/football/teams/723.png",
            winner: null,
          },
          away: {
            id: 541,
            name: "Real Madrid",
            logo: "https://media.api-sports.io/football/teams/541.png",
            winner: null,
          },
        },
        goals: {
          home: null,
          away: null,
        },
        score: {
          halftime: {
            home: null,
            away: null,
          },
          fulltime: {
            home: null,
            away: null,
          },
          extratime: {
            home: null,
            away: null,
          },
          penalty: {
            home: null,
            away: null,
          },
        },
      },
      {
        fixture: {
          id: 877942,
          timezone: "Europe/Kiev",
          date: "2022-08-15T18:30:00+03:00",
          timestamp: 1660577400,
          periods: {
            first: null,
            second: null,
          },
          venue: {
            id: 1460,
            name: "San Mamés Barria",
            city: "Bilbao",
          },
          status: {
            long: "Not Started",
            short: FixtureStatus.NS,
            elapsed: null,
          },
        },
        league: {
          id: 140,
          name: "La Liga",
          country: "Spain",
          logo: "https://media.api-sports.io/football/leagues/140.png",
          flag: "https://media.api-sports.io/flags/es.svg",
          season: 2022,
          round: "Regular Season - 1",
        },
        teams: {
          home: {
            id: 531,
            name: "Athletic Club",
            logo: "https://media.api-sports.io/football/teams/531.png",
            winner: null,
          },
          away: {
            id: 798,
            name: "Mallorca",
            logo: "https://media.api-sports.io/football/teams/798.png",
            winner: null,
          },
        },
        goals: {
          home: null,
          away: null,
        },
        score: {
          halftime: {
            home: null,
            away: null,
          },
          fulltime: {
            home: null,
            away: null,
          },
          extratime: {
            home: null,
            away: null,
          },
          penalty: {
            home: null,
            away: null,
          },
        },
      },
      {
        fixture: {
          id: 877949,
          timezone: "Europe/Kiev",
          date: "2022-08-15T20:30:00+03:00",
          timestamp: 1660584600,
          periods: {
            first: null,
            second: null,
          },
          venue: {
            id: 1476,
            name: "Coliseum Alfonso Pérez",
            city: "Getafe",
          },
          status: {
            long: "Not Started",
            short: FixtureStatus.NS,
            elapsed: null,
          },
        },
        league: {
          id: 140,
          name: "La Liga",
          country: "Spain",
          logo: "https://media.api-sports.io/football/leagues/140.png",
          flag: "https://media.api-sports.io/flags/es.svg",
          season: 2022,
          round: "Regular Season - 1",
        },
        teams: {
          home: {
            id: 546,
            name: "Getafe",
            logo: "https://media.api-sports.io/football/teams/546.png",
            winner: null,
          },
          away: {
            id: 530,
            name: "Atletico Madrid",
            logo: "https://media.api-sports.io/football/teams/530.png",
            winner: null,
          },
        },
        goals: {
          home: null,
          away: null,
        },
        score: {
          halftime: {
            home: null,
            away: null,
          },
          fulltime: {
            home: null,
            away: null,
          },
          extratime: {
            home: null,
            away: null,
          },
          penalty: {
            home: null,
            away: null,
          },
        },
      },
      {
        fixture: {
          id: 877944,
          timezone: "Europe/Kiev",
          date: "2022-08-15T22:30:00+03:00",
          timestamp: 1660591800,
          periods: {
            first: null,
            second: null,
          },
          venue: {
            id: 1489,
            name: "Estadio Benito Villamarín",
            city: "Sevilla",
          },
          status: {
            long: "Not Started",
            short: FixtureStatus.NS,
            elapsed: null,
          },
        },
        league: {
          id: 140,
          name: "La Liga",
          country: "Spain",
          logo: "https://media.api-sports.io/football/leagues/140.png",
          flag: "https://media.api-sports.io/flags/es.svg",
          season: 2022,
          round: "Regular Season - 1",
        },
        teams: {
          home: {
            id: 543,
            name: "Real Betis",
            logo: "https://media.api-sports.io/football/teams/543.png",
            winner: null,
          },
          away: {
            id: 797,
            name: "Elche",
            logo: "https://media.api-sports.io/football/teams/797.png",
            winner: null,
          },
        },
        goals: {
          home: null,
          away: null,
        },
        score: {
          halftime: {
            home: null,
            away: null,
          },
          fulltime: {
            home: null,
            away: null,
          },
          extratime: {
            home: null,
            away: null,
          },
          penalty: {
            home: null,
            away: null,
          },
        },
      },
    ],
  },
]);
export const $leagueStandings = createStore<Standing[]>([
  {
    rank: 1,
    team: {
      id: 548,
      name: "Real Sociedad",
      logo: "https://media.api-sports.io/football/teams/548.png",
    },
    points: 0,
    goalsDiff: 0,
    group: "La Liga",
    form: null,
    status: "same",
    description: null,
    all: {
      played: 0,
      win: 0,
      draw: 0,
      lose: 0,
      goals: {
        for: 0,
        against: 0,
      },
    },
    home: {
      played: null,
      win: null,
      draw: null,
      lose: null,
      goals: {
        for: null,
        against: null,
      },
    },
    away: {
      played: null,
      win: null,
      draw: null,
      lose: null,
      goals: {
        for: null,
        against: null,
      },
    },
    update: "2022-07-14T00:00:00+00:00",
  },
  {
    rank: 2,
    team: {
      id: 797,
      name: "Elche",
      logo: "https://media.api-sports.io/football/teams/797.png",
    },
    points: 0,
    goalsDiff: 0,
    group: "La Liga",
    form: null,
    status: "same",
    description: null,
    all: {
      played: 0,
      win: 0,
      draw: 0,
      lose: 0,
      goals: {
        for: 0,
        against: 0,
      },
    },
    home: {
      played: null,
      win: null,
      draw: null,
      lose: null,
      goals: {
        for: null,
        against: null,
      },
    },
    away: {
      played: null,
      win: null,
      draw: null,
      lose: null,
      goals: {
        for: null,
        against: null,
      },
    },
    update: "2022-07-14T00:00:00+00:00",
  },
  {
    rank: 3,
    team: {
      id: 538,
      name: "Celta Vigo",
      logo: "https://media.api-sports.io/football/teams/538.png",
    },
    points: 0,
    goalsDiff: 0,
    group: "La Liga",
    form: null,
    status: "same",
    description: null,
    all: {
      played: 0,
      win: 0,
      draw: 0,
      lose: 0,
      goals: {
        for: 0,
        against: 0,
      },
    },
    home: {
      played: null,
      win: null,
      draw: null,
      lose: null,
      goals: {
        for: null,
        against: null,
      },
    },
    away: {
      played: null,
      win: null,
      draw: null,
      lose: null,
      goals: {
        for: null,
        against: null,
      },
    },
    update: "2022-07-14T00:00:00+00:00",
  },
  {
    rank: 4,
    team: {
      id: 724,
      name: "Cadiz",
      logo: "https://media.api-sports.io/football/teams/724.png",
    },
    points: 0,
    goalsDiff: 0,
    group: "La Liga",
    form: null,
    status: "same",
    description: null,
    all: {
      played: 0,
      win: 0,
      draw: 0,
      lose: 0,
      goals: {
        for: 0,
        against: 0,
      },
    },
    home: {
      played: null,
      win: null,
      draw: null,
      lose: null,
      goals: {
        for: null,
        against: null,
      },
    },
    away: {
      played: null,
      win: null,
      draw: null,
      lose: null,
      goals: {
        for: null,
        against: null,
      },
    },
    update: "2022-07-14T00:00:00+00:00",
  },
  {
    rank: 5,
    team: {
      id: 728,
      name: "Rayo Vallecano",
      logo: "https://media.api-sports.io/football/teams/728.png",
    },
    points: 0,
    goalsDiff: 0,
    group: "La Liga",
    form: null,
    status: "same",
    description: null,
    all: {
      played: 0,
      win: 0,
      draw: 0,
      lose: 0,
      goals: {
        for: 0,
        against: 0,
      },
    },
    home: {
      played: null,
      win: null,
      draw: null,
      lose: null,
      goals: {
        for: null,
        against: null,
      },
    },
    away: {
      played: null,
      win: null,
      draw: null,
      lose: null,
      goals: {
        for: null,
        against: null,
      },
    },
    update: "2022-07-14T00:00:00+00:00",
  },
  {
    rank: 6,
    team: {
      id: 541,
      name: "Real Madrid",
      logo: "https://media.api-sports.io/football/teams/541.png",
    },
    points: 0,
    goalsDiff: 0,
    group: "La Liga",
    form: null,
    status: "same",
    description: null,
    all: {
      played: 0,
      win: 0,
      draw: 0,
      lose: 0,
      goals: {
        for: 0,
        against: 0,
      },
    },
    home: {
      played: null,
      win: null,
      draw: null,
      lose: null,
      goals: {
        for: null,
        against: null,
      },
    },
    away: {
      played: null,
      win: null,
      draw: null,
      lose: null,
      goals: {
        for: null,
        against: null,
      },
    },
    update: "2022-07-14T00:00:00+00:00",
  },
  {
    rank: 7,
    team: {
      id: 533,
      name: "Villarreal",
      logo: "https://media.api-sports.io/football/teams/533.png",
    },
    points: 0,
    goalsDiff: 0,
    group: "La Liga",
    form: null,
    status: "same",
    description: null,
    all: {
      played: 0,
      win: 0,
      draw: 0,
      lose: 0,
      goals: {
        for: 0,
        against: 0,
      },
    },
    home: {
      played: null,
      win: null,
      draw: null,
      lose: null,
      goals: {
        for: null,
        against: null,
      },
    },
    away: {
      played: null,
      win: null,
      draw: null,
      lose: null,
      goals: {
        for: null,
        against: null,
      },
    },
    update: "2022-07-14T00:00:00+00:00",
  },
  {
    rank: 8,
    team: {
      id: 529,
      name: "Barcelona",
      logo: "https://media.api-sports.io/football/teams/529.png",
    },
    points: 0,
    goalsDiff: 0,
    group: "La Liga",
    form: null,
    status: "same",
    description: null,
    all: {
      played: 0,
      win: 0,
      draw: 0,
      lose: 0,
      goals: {
        for: 0,
        against: 0,
      },
    },
    home: {
      played: null,
      win: null,
      draw: null,
      lose: null,
      goals: {
        for: null,
        against: null,
      },
    },
    away: {
      played: null,
      win: null,
      draw: null,
      lose: null,
      goals: {
        for: null,
        against: null,
      },
    },
    update: "2022-07-14T00:00:00+00:00",
  },
  {
    rank: 9,
    team: {
      id: 530,
      name: "Atletico Madrid",
      logo: "https://media.api-sports.io/football/teams/530.png",
    },
    points: 0,
    goalsDiff: 0,
    group: "La Liga",
    form: null,
    status: "same",
    description: null,
    all: {
      played: 0,
      win: 0,
      draw: 0,
      lose: 0,
      goals: {
        for: 0,
        against: 0,
      },
    },
    home: {
      played: null,
      win: null,
      draw: null,
      lose: null,
      goals: {
        for: null,
        against: null,
      },
    },
    away: {
      played: null,
      win: null,
      draw: null,
      lose: null,
      goals: {
        for: null,
        against: null,
      },
    },
    update: "2022-07-14T00:00:00+00:00",
  },
  {
    rank: 10,
    team: {
      id: 536,
      name: "Sevilla",
      logo: "https://media.api-sports.io/football/teams/536.png",
    },
    points: 0,
    goalsDiff: 0,
    group: "La Liga",
    form: null,
    status: "same",
    description: null,
    all: {
      played: 0,
      win: 0,
      draw: 0,
      lose: 0,
      goals: {
        for: 0,
        against: 0,
      },
    },
    home: {
      played: null,
      win: null,
      draw: null,
      lose: null,
      goals: {
        for: null,
        against: null,
      },
    },
    away: {
      played: null,
      win: null,
      draw: null,
      lose: null,
      goals: {
        for: null,
        against: null,
      },
    },
    update: "2022-07-14T00:00:00+00:00",
  },
  {
    rank: 11,
    team: {
      id: 798,
      name: "Mallorca",
      logo: "https://media.api-sports.io/football/teams/798.png",
    },
    points: 0,
    goalsDiff: 0,
    group: "La Liga",
    form: null,
    status: "same",
    description: null,
    all: {
      played: 0,
      win: 0,
      draw: 0,
      lose: 0,
      goals: {
        for: 0,
        against: 0,
      },
    },
    home: {
      played: null,
      win: null,
      draw: null,
      lose: null,
      goals: {
        for: null,
        against: null,
      },
    },
    away: {
      played: null,
      win: null,
      draw: null,
      lose: null,
      goals: {
        for: null,
        against: null,
      },
    },
    update: "2022-07-14T00:00:00+00:00",
  },
  {
    rank: 12,
    team: {
      id: 723,
      name: "Almeria",
      logo: "https://media.api-sports.io/football/teams/723.png",
    },
    points: 0,
    goalsDiff: 0,
    group: "La Liga",
    form: null,
    status: "same",
    description: null,
    all: {
      played: 0,
      win: 0,
      draw: 0,
      lose: 0,
      goals: {
        for: 0,
        against: 0,
      },
    },
    home: {
      played: null,
      win: null,
      draw: null,
      lose: null,
      goals: {
        for: null,
        against: null,
      },
    },
    away: {
      played: null,
      win: null,
      draw: null,
      lose: null,
      goals: {
        for: null,
        against: null,
      },
    },
    update: "2022-07-14T00:00:00+00:00",
  },
  {
    rank: 13,
    team: {
      id: 532,
      name: "Valencia",
      logo: "https://media.api-sports.io/football/teams/532.png",
    },
    points: 0,
    goalsDiff: 0,
    group: "La Liga",
    form: null,
    status: "same",
    description: null,
    all: {
      played: 0,
      win: 0,
      draw: 0,
      lose: 0,
      goals: {
        for: 0,
        against: 0,
      },
    },
    home: {
      played: null,
      win: null,
      draw: null,
      lose: null,
      goals: {
        for: null,
        against: null,
      },
    },
    away: {
      played: null,
      win: null,
      draw: null,
      lose: null,
      goals: {
        for: null,
        against: null,
      },
    },
    update: "2022-07-14T00:00:00+00:00",
  },
  {
    rank: 14,
    team: {
      id: 531,
      name: "Athletic Club",
      logo: "https://media.api-sports.io/football/teams/531.png",
    },
    points: 0,
    goalsDiff: 0,
    group: "La Liga",
    form: null,
    status: "same",
    description: null,
    all: {
      played: 0,
      win: 0,
      draw: 0,
      lose: 0,
      goals: {
        for: 0,
        against: 0,
      },
    },
    home: {
      played: null,
      win: null,
      draw: null,
      lose: null,
      goals: {
        for: null,
        against: null,
      },
    },
    away: {
      played: null,
      win: null,
      draw: null,
      lose: null,
      goals: {
        for: null,
        against: null,
      },
    },
    update: "2022-07-14T00:00:00+00:00",
  },
  {
    rank: 15,
    team: {
      id: 540,
      name: "Espanyol",
      logo: "https://media.api-sports.io/football/teams/540.png",
    },
    points: 0,
    goalsDiff: 0,
    group: "La Liga",
    form: null,
    status: "same",
    description: null,
    all: {
      played: 0,
      win: 0,
      draw: 0,
      lose: 0,
      goals: {
        for: 0,
        against: 0,
      },
    },
    home: {
      played: null,
      win: null,
      draw: null,
      lose: null,
      goals: {
        for: null,
        against: null,
      },
    },
    away: {
      played: null,
      win: null,
      draw: null,
      lose: null,
      goals: {
        for: null,
        against: null,
      },
    },
    update: "2022-07-14T00:00:00+00:00",
  },
  {
    rank: 16,
    team: {
      id: 543,
      name: "Real Betis",
      logo: "https://media.api-sports.io/football/teams/543.png",
    },
    points: 0,
    goalsDiff: 0,
    group: "La Liga",
    form: null,
    status: "same",
    description: null,
    all: {
      played: 0,
      win: 0,
      draw: 0,
      lose: 0,
      goals: {
        for: 0,
        against: 0,
      },
    },
    home: {
      played: null,
      win: null,
      draw: null,
      lose: null,
      goals: {
        for: null,
        against: null,
      },
    },
    away: {
      played: null,
      win: null,
      draw: null,
      lose: null,
      goals: {
        for: null,
        against: null,
      },
    },
    update: "2022-07-14T00:00:00+00:00",
  },
  {
    rank: 17,
    team: {
      id: 546,
      name: "Getafe",
      logo: "https://media.api-sports.io/football/teams/546.png",
    },
    points: 0,
    goalsDiff: 0,
    group: "La Liga",
    form: null,
    status: "same",
    description: null,
    all: {
      played: 0,
      win: 0,
      draw: 0,
      lose: 0,
      goals: {
        for: 0,
        against: 0,
      },
    },
    home: {
      played: null,
      win: null,
      draw: null,
      lose: null,
      goals: {
        for: null,
        against: null,
      },
    },
    away: {
      played: null,
      win: null,
      draw: null,
      lose: null,
      goals: {
        for: null,
        against: null,
      },
    },
    update: "2022-07-14T00:00:00+00:00",
  },
  {
    rank: 18,
    team: {
      id: 720,
      name: "Valladolid",
      logo: "https://media.api-sports.io/football/teams/720.png",
    },
    points: 0,
    goalsDiff: 0,
    group: "La Liga",
    form: null,
    status: "same",
    description: null,
    all: {
      played: 0,
      win: 0,
      draw: 0,
      lose: 0,
      goals: {
        for: 0,
        against: 0,
      },
    },
    home: {
      played: null,
      win: null,
      draw: null,
      lose: null,
      goals: {
        for: null,
        against: null,
      },
    },
    away: {
      played: null,
      win: null,
      draw: null,
      lose: null,
      goals: {
        for: null,
        against: null,
      },
    },
    update: "2022-07-14T00:00:00+00:00",
  },
  {
    rank: 19,
    team: {
      id: 727,
      name: "Osasuna",
      logo: "https://media.api-sports.io/football/teams/727.png",
    },
    points: 0,
    goalsDiff: 0,
    group: "La Liga",
    form: null,
    status: "same",
    description: null,
    all: {
      played: 0,
      win: 0,
      draw: 0,
      lose: 0,
      goals: {
        for: 0,
        against: 0,
      },
    },
    home: {
      played: null,
      win: null,
      draw: null,
      lose: null,
      goals: {
        for: null,
        against: null,
      },
    },
    away: {
      played: null,
      win: null,
      draw: null,
      lose: null,
      goals: {
        for: null,
        against: null,
      },
    },
    update: "2022-07-14T00:00:00+00:00",
  },
  {
    rank: 20,
    team: {
      id: 547,
      name: "Girona",
      logo: "https://media.api-sports.io/football/teams/547.png",
    },
    points: 0,
    goalsDiff: 0,
    group: "La Liga",
    form: null,
    status: "same",
    description: null,
    all: {
      played: 0,
      win: 0,
      draw: 0,
      lose: 0,
      goals: {
        for: 0,
        against: 0,
      },
    },
    home: {
      played: null,
      win: null,
      draw: null,
      lose: null,
      goals: {
        for: null,
        against: null,
      },
    },
    away: {
      played: null,
      win: null,
      draw: null,
      lose: null,
      goals: {
        for: null,
        against: null,
      },
    },
    update: "2022-07-14T00:00:00+00:00",
  },
]);
export const $isCurrentRound = createStore<boolean>(true);

forward({
  from: leagueSet,
  to: fetchLeagueFx,
});

sample({
  clock: fetchLeagueFixturesFx.doneData,
  source: $leagueFixtures,
  fn: (leagueFixtures, fetchedLeagueFixtures) => {
    const fixturesArray: { [key: string]: FixtureResponse[] }[] = [];
    const sortedFixtures = fetchedLeagueFixtures.sort(
      (a, b) => a.fixture.timestamp - b.fixture.timestamp
    );

    sortedFixtures.forEach((fixture) => {
      const leagueName = fixture.league.name;
    });

    return leagueFixtures;
  },
  target: $leagueFixtures,
});

sample({
  clock: fetchLeagueRoundsFx.doneData,
  target: $leagueRounds,
});

sample({
  clock: fetchLeagueStandingsFx.doneData,
  filter: (standings) => Boolean(standings[0].league.standings[0]),
  fn: (standings): Standing[] => {
    return standings[0].league.standings[0];
  },
  target: $leagueStandings,
});
