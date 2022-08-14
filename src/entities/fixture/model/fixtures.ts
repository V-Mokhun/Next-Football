import {
  FixtureResponse,
  FixturesQueryParams,
  FixtureStatus,
  rapidApi,
} from "@/shared/api";
import { createEffect, createEvent, createStore, sample } from "effector";

export const liveFixturesSelected = createEvent();
export const allFixturesSelected = createEvent();

export const fetchFixturesFx = createEffect<
  FixturesQueryParams,
  FixtureResponse[],
  Error
>(async (params) => {
  const { response } = await rapidApi.fixturesApi.getFixtures(params);

  return response;
});

export const $isLiveFixtures =
  createStore<boolean>(false).reset(allFixturesSelected);
export const $buttonsDisabled = createStore<boolean>(false);

export const $fixtures = createStore<{ [key: string]: FixtureResponse[] }[]>([
  {
    "Primera A": [
      {
        fixture: {
          id: 822960,
          timezone: "Europe/Kiev",
          date: "2022-08-07T00:05:00+03:00",
          timestamp: 1659819900,
          periods: {
            first: 1659819900,
            second: 1659823500,
          },
          venue: {
            id: 375,
            name: "Estadio Manuel Murillo Toro",
            city: "Ibagué",
          },
          status: {
            long: "Match Finished",
            short: FixtureStatus.FT,
            elapsed: 90,
          },
        },
        league: {
          id: 239,
          name: "Primera A",
          country: "Colombia",
          logo: "https://media.api-sports.io/football/leagues/239.png",
          flag: "https://media.api-sports.io/flags/co.svg",
          season: 2022,
          round: "Clausura - 6",
        },
        teams: {
          home: {
            id: 1142,
            name: "Deportes Tolima",
            logo: "https://media.api-sports.io/football/teams/1142.png",
            winner: null,
          },
          away: {
            id: 1133,
            name: "Jaguares",
            logo: "https://media.api-sports.io/football/teams/1133.png",
            winner: null,
          },
        },
        goals: {
          home: 2,
          away: 2,
        },
        score: {
          halftime: {
            home: 0,
            away: 1,
          },
          fulltime: {
            home: 2,
            away: 2,
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
          id: 822966,
          timezone: "Europe/Kiev",
          date: "2022-08-07T02:10:00+03:00",
          timestamp: 1659827400,
          periods: {
            first: 1659827400,
            second: 1659831000,
          },
          venue: {
            id: 367,
            name: "Estadio Daniel Villa Zapata",
            city: "Barrancabermeja",
          },
          status: {
            long: "Match Finished",
            short: FixtureStatus.FT,
            elapsed: 90,
          },
        },
        league: {
          id: 239,
          name: "Primera A",
          country: "Colombia",
          logo: "https://media.api-sports.io/football/leagues/239.png",
          flag: "https://media.api-sports.io/flags/co.svg",
          season: 2022,
          round: "Clausura - 6",
        },
        teams: {
          home: {
            id: 1141,
            name: "Alianza Petrolera",
            logo: "https://media.api-sports.io/football/teams/1141.png",
            winner: false,
          },
          away: {
            id: 1137,
            name: "Atletico Nacional",
            logo: "https://media.api-sports.io/football/teams/1137.png",
            winner: true,
          },
        },
        goals: {
          home: 0,
          away: 2,
        },
        score: {
          halftime: {
            home: 0,
            away: 0,
          },
          fulltime: {
            home: 0,
            away: 2,
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
          id: 822964,
          timezone: "Europe/Kiev",
          date: "2022-08-07T04:15:00+03:00",
          timestamp: 1659834900,
          periods: {
            first: 1659834900,
            second: 1659838500,
          },
          venue: {
            id: 383,
            name: "Estadio Nemesio Camacho El Campín",
            city: "Bogotá, D.C.",
          },
          status: {
            long: "Match Finished",
            short: FixtureStatus.FT,
            elapsed: 90,
          },
        },
        league: {
          id: 239,
          name: "Primera A",
          country: "Colombia",
          logo: "https://media.api-sports.io/football/leagues/239.png",
          flag: "https://media.api-sports.io/flags/co.svg",
          season: 2022,
          round: "Clausura - 6",
        },
        teams: {
          home: {
            id: 1125,
            name: "Millonarios",
            logo: "https://media.api-sports.io/football/teams/1125.png",
            winner: true,
          },
          away: {
            id: 1127,
            name: "Deportivo Cali",
            logo: "https://media.api-sports.io/football/teams/1127.png",
            winner: false,
          },
        },
        goals: {
          home: 4,
          away: 2,
        },
        score: {
          halftime: {
            home: 2,
            away: 0,
          },
          fulltime: {
            home: 4,
            away: 2,
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
          id: 822961,
          timezone: "Europe/Kiev",
          date: "2022-08-07T22:00:00+03:00",
          timestamp: 1659898800,
          periods: {
            first: null,
            second: null,
          },
          venue: {
            id: 377,
            name: "Estadio Departamental Libertad",
            city: "San Juan de Pasto",
          },
          status: {
            long: "Not Started",
            short: FixtureStatus.NS,
            elapsed: null,
          },
        },
        league: {
          id: 239,
          name: "Primera A",
          country: "Colombia",
          logo: "https://media.api-sports.io/football/leagues/239.png",
          flag: "https://media.api-sports.io/flags/co.svg",
          season: 2022,
          round: "Clausura - 6",
        },
        teams: {
          home: {
            id: 1126,
            name: "Deportivo Pasto",
            logo: "https://media.api-sports.io/football/teams/1126.png",
            winner: null,
          },
          away: {
            id: 1131,
            name: "Bucaramanga",
            logo: "https://media.api-sports.io/football/teams/1131.png",
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
  {
    Bundesliga: [
      {
        fixture: {
          id: 871172,
          timezone: "Europe/Kiev",
          date: "2022-08-07T16:30:00+03:00",
          timestamp: 1659879000,
          periods: {
            first: null,
            second: null,
          },
          venue: {
            id: 750,
            name: "Mercedes-Benz-Arena",
            city: "Stuttgart",
          },
          status: {
            long: "Not Started",
            short: FixtureStatus.NS,
            elapsed: null,
          },
        },
        league: {
          id: 78,
          name: "Bundesliga",
          country: "Germany",
          logo: "https://media.api-sports.io/football/leagues/78.png",
          flag: "https://media.api-sports.io/flags/de.svg",
          season: 2022,
          round: "Regular Season - 1",
        },
        teams: {
          home: {
            id: 172,
            name: "VfB Stuttgart",
            logo: "https://media.api-sports.io/football/teams/172.png",
            winner: null,
          },
          away: {
            id: 173,
            name: "RB Leipzig",
            logo: "https://media.api-sports.io/football/teams/173.png",
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
          id: 874368,
          timezone: "Europe/Kiev",
          date: "2022-08-07T18:00:00+03:00",
          timestamp: 1659884400,
          periods: {
            first: null,
            second: null,
          },
          venue: {
            id: 146,
            name: "CASHPOINT Arena",
            city: "Altach",
          },
          status: {
            long: "Not Started",
            short: FixtureStatus.NS,
            elapsed: null,
          },
        },
        league: {
          id: 218,
          name: "Bundesliga",
          country: "Austria",
          logo: "https://media.api-sports.io/football/leagues/218.png",
          flag: "https://media.api-sports.io/flags/at.svg",
          season: 2022,
          round: "Regular Season - 3",
        },
        teams: {
          home: {
            id: 618,
            name: "SCR Altach",
            logo: "https://media.api-sports.io/football/teams/618.png",
            winner: null,
          },
          away: {
            id: 601,
            name: "Austria Vienna",
            logo: "https://media.api-sports.io/football/teams/601.png",
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
          id: 874370,
          timezone: "Europe/Kiev",
          date: "2022-08-07T18:00:00+03:00",
          timestamp: 1659884400,
          periods: {
            first: null,
            second: null,
          },
          venue: {
            id: 152,
            name: "Tivoli Stadion Tirol",
            city: "Innsbruck",
          },
          status: {
            long: "Not Started",
            short: FixtureStatus.NS,
            elapsed: null,
          },
        },
        league: {
          id: 218,
          name: "Bundesliga",
          country: "Austria",
          logo: "https://media.api-sports.io/football/leagues/218.png",
          flag: "https://media.api-sports.io/flags/at.svg",
          season: 2022,
          round: "Regular Season - 3",
        },
        teams: {
          home: {
            id: 1398,
            name: "WSG Wattens",
            logo: "https://media.api-sports.io/football/teams/1398.png",
            winner: null,
          },
          away: {
            id: 1405,
            name: "Austria Klagenfurt",
            logo: "https://media.api-sports.io/football/teams/1405.png",
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
          id: 874372,
          timezone: "Europe/Kiev",
          date: "2022-08-07T18:00:00+03:00",
          timestamp: 1659884400,
          periods: {
            first: null,
            second: null,
          },
          venue: {
            id: 145,
            name: "Allianz Stadion",
            city: "Wien",
          },
          status: {
            long: "Not Started",
            short: FixtureStatus.NS,
            elapsed: null,
          },
        },
        league: {
          id: 218,
          name: "Bundesliga",
          country: "Austria",
          logo: "https://media.api-sports.io/football/leagues/218.png",
          flag: "https://media.api-sports.io/flags/at.svg",
          season: 2022,
          round: "Regular Season - 3",
        },
        teams: {
          home: {
            id: 781,
            name: "Rapid Vienna",
            logo: "https://media.api-sports.io/football/teams/781.png",
            winner: null,
          },
          away: {
            id: 1399,
            name: "Austria Lustenau",
            logo: "https://media.api-sports.io/football/teams/1399.png",
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
          id: 871167,
          timezone: "Europe/Kiev",
          date: "2022-08-07T18:30:00+03:00",
          timestamp: 1659886200,
          periods: {
            first: null,
            second: null,
          },
          venue: {
            id: 731,
            name: "RheinEnergieStadion",
            city: "Köln",
          },
          status: {
            long: "Not Started",
            short: FixtureStatus.NS,
            elapsed: null,
          },
        },
        league: {
          id: 78,
          name: "Bundesliga",
          country: "Germany",
          logo: "https://media.api-sports.io/football/leagues/78.png",
          flag: "https://media.api-sports.io/flags/de.svg",
          season: 2022,
          round: "Regular Season - 1",
        },
        teams: {
          home: {
            id: 192,
            name: "FC Koln",
            logo: "https://media.api-sports.io/football/teams/192.png",
            winner: null,
          },
          away: {
            id: 174,
            name: "FC Schalke 04",
            logo: "https://media.api-sports.io/football/teams/174.png",
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
  {
    "Friendlies Clubs": [
      {
        fixture: {
          id: 891078,
          timezone: "Europe/Kiev",
          date: "2022-08-07T03:00:00+03:00",
          timestamp: 1659830400,
          periods: {
            first: null,
            second: null,
          },
          venue: {
            id: null,
            name: "TBC",
            city: "TBC",
          },
          status: {
            long: "Time to be defined",
            short: FixtureStatus.TBD,
            elapsed: null,
          },
        },
        league: {
          id: 667,
          name: "Friendlies Clubs",
          country: "World",
          logo: "https://media.api-sports.io/football/leagues/667.png",
          flag: null,
          season: 2022,
          round: "Club Friendlies 3",
        },
        teams: {
          home: {
            id: 3397,
            name: "Alki Oroklini",
            logo: "https://media.api-sports.io/football/teams/3397.png",
            winner: null,
          },
          away: {
            id: 3415,
            name: "Olympiakos",
            logo: "https://media.api-sports.io/football/teams/3415.png",
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
          id: 922139,
          timezone: "Europe/Kiev",
          date: "2022-08-07T19:00:00+03:00",
          timestamp: 1659888000,
          periods: {
            first: null,
            second: null,
          },
          venue: {
            id: null,
            name: "Bloomfield Stadium",
            city: "Tel-Aviv",
          },
          status: {
            long: "Not Started",
            short: FixtureStatus.NS,
            elapsed: null,
          },
        },
        league: {
          id: 667,
          name: "Friendlies Clubs",
          country: "World",
          logo: "https://media.api-sports.io/football/leagues/667.png",
          flag: null,
          season: 2022,
          round: "Club Friendlies 1",
        },
        teams: {
          home: {
            id: 496,
            name: "Juventus",
            logo: "https://media.api-sports.io/football/teams/496.png",
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
          id: 891076,
          timezone: "Europe/Kiev",
          date: "2022-08-07T20:00:00+03:00",
          timestamp: 1659891600,
          periods: {
            first: null,
            second: null,
          },
          venue: {
            id: null,
            name: "Dimotiko Gipedo Neapolis Nikaias",
            city: "Athens",
          },
          status: {
            long: "Not Started",
            short: FixtureStatus.NS,
            elapsed: null,
          },
        },
        league: {
          id: 667,
          name: "Friendlies Clubs",
          country: "World",
          logo: "https://media.api-sports.io/football/leagues/667.png",
          flag: null,
          season: 2022,
          round: "Club Friendlies 3",
        },
        teams: {
          home: {
            id: 7513,
            name: "Ionikos",
            logo: "https://media.api-sports.io/football/teams/7513.png",
            winner: null,
          },
          away: {
            id: 12260,
            name: "Atromitos",
            logo: "https://media.api-sports.io/football/teams/12260.png",
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
          id: 922563,
          timezone: "Europe/Kiev",
          date: "2022-08-07T20:00:00+03:00",
          timestamp: 1659891600,
          periods: {
            first: null,
            second: null,
          },
          venue: {
            id: null,
            name: "Camps Municipals de Futbol La Vinyassa",
            city: "Roses",
          },
          status: {
            long: "Not Started",
            short: FixtureStatus.NS,
            elapsed: null,
          },
        },
        league: {
          id: 667,
          name: "Friendlies Clubs",
          country: "World",
          logo: "https://media.api-sports.io/football/leagues/667.png",
          flag: null,
          season: 2022,
          round: "Club Friendlies 3",
        },
        teams: {
          home: {
            id: 547,
            name: "Girona",
            logo: "https://media.api-sports.io/football/teams/547.png",
            winner: null,
          },
          away: {
            id: 732,
            name: "Zaragoza",
            logo: "https://media.api-sports.io/football/teams/732.png",
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
          id: 891077,
          timezone: "Europe/Kiev",
          date: "2022-08-07T21:00:00+03:00",
          timestamp: 1659895200,
          periods: {
            first: null,
            second: null,
          },
          venue: {
            id: 1918,
            name: "Panthessaliko Stadio",
            city: "Volos",
          },
          status: {
            long: "Not Started",
            short: FixtureStatus.NS,
            elapsed: null,
          },
        },
        league: {
          id: 667,
          name: "Friendlies Clubs",
          country: "World",
          logo: "https://media.api-sports.io/football/leagues/667.png",
          flag: null,
          season: 2022,
          round: "Club Friendlies 3",
        },
        teams: {
          home: {
            id: 2110,
            name: "Volos NFC",
            logo: "https://media.api-sports.io/football/teams/2110.png",
            winner: null,
          },
          away: {
            id: 950,
            name: "PAS Giannina",
            logo: "https://media.api-sports.io/football/teams/950.png",
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
          id: 922140,
          timezone: "Europe/Kiev",
          date: "2022-08-07T21:45:00+03:00",
          timestamp: 1659897900,
          periods: {
            first: null,
            second: null,
          },
          venue: {
            id: 910,
            name: "Stadio Olimpico",
            city: "Roma",
          },
          status: {
            long: "Not Started",
            short: FixtureStatus.NS,
            elapsed: null,
          },
        },
        league: {
          id: 667,
          name: "Friendlies Clubs",
          country: "World",
          logo: "https://media.api-sports.io/football/leagues/667.png",
          flag: null,
          season: 2022,
          round: "Club Friendlies 1",
        },
        teams: {
          home: {
            id: 497,
            name: "AS Roma",
            logo: "https://media.api-sports.io/football/teams/497.png",
            winner: null,
          },
          away: {
            id: 550,
            name: "Shakhtar Donetsk",
            logo: "https://media.api-sports.io/football/teams/550.png",
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
]).reset(fetchFixturesFx.failData);
export const $fixturesError = createStore("").reset(fetchFixturesFx);
export const $fixutresLoading = fetchFixturesFx.pending;

sample({
  clock: liveFixturesSelected,
  fn: () => true,
  target: $isLiveFixtures,
});

sample({
  clock: fetchFixturesFx.failData,
  fn: ({ message }) => message,
  target: $fixturesError,
});
