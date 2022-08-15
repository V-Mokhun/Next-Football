import {
  FixtureStatus,
  rapidApi,
  SingleFixtureQueryParams,
  SingleFixtureResponse,
} from "@/shared/api";
import {
  createEffect,
  createEvent,
  createStore,
  restore,
  sample,
} from "effector";

export const singleFixtureSet = createEvent<SingleFixtureQueryParams>();

export const fetchSingleFixtureFx = createEffect<
  SingleFixtureQueryParams,
  SingleFixtureResponse,
  Error
>(async (params) => {
  const { response } = await rapidApi.fixturesApi.getSingleFixture(params);

  return response[0];
});

export const $singleFixture = restore(fetchSingleFixtureFx.doneData, {
  fixture: {
    id: 867958,
    timezone: "Europe/Kiev",
    referee: "Some referee",
    date: "2022-08-13T19:30:00+03:00",
    timestamp: 1660408200,
    periods: {
      first: 1660408200,
      second: 1660411800,
    },
    venue: {
      id: 10503,
      name: "Gtech Community Stadium",
      city: "Brentford, Middlesex",
    },
    status: {
      long: "Match Finished",
      short: FixtureStatus.FT,
      elapsed: 90,
    },
  },
  league: {
    id: 39,
    name: "Premier League",
    country: "England",
    logo: "https://media.api-sports.io/football/leagues/39.png",
    flag: "https://media.api-sports.io/flags/gb.svg",
    season: 2022,
    round: "Regular Season - 2",
  },
  teams: {
    home: {
      id: 55,
      name: "Brentford",
      logo: "https://media.api-sports.io/football/teams/55.png",
      winner: true,
    },
    away: {
      id: 33,
      name: "Manchester United",
      logo: "https://media.api-sports.io/football/teams/33.png",
      winner: false,
    },
  },
  goals: {
    home: 4,
    away: 0,
  },
  score: {
    halftime: {
      home: 4,
      away: 0,
    },
    fulltime: {
      home: 4,
      away: 0,
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
  events: [
    {
      time: {
        elapsed: 10,
        extra: null,
      },
      team: {
        id: 55,
        name: "Brentford",
        logo: "https://media.api-sports.io/football/teams/55.png",
      },
      player: {
        id: 19362,
        name: "J. Dasilva",
      },
      assist: {
        id: 47438,
        name: "M. Jensen",
      },
      type: "Goal",
      detail: "Normal Goal",
      comments: null,
    },
    {
      time: {
        elapsed: 16,
        extra: null,
      },
      team: {
        id: 33,
        name: "Manchester United",
        logo: "https://media.api-sports.io/football/teams/33.png",
      },
      player: {
        id: 2935,
        name: "Harry Maguire",
      },
      assist: {
        id: null,
        name: null,
      },
      type: "Card",
      detail: "Yellow Card",
      comments: "Foul",
    },
    {
      time: {
        elapsed: 18,
        extra: null,
      },
      team: {
        id: 55,
        name: "Brentford",
        logo: "https://media.api-sports.io/football/teams/55.png",
      },
      player: {
        id: 47438,
        name: "M. Jensen",
      },
      assist: {
        id: null,
        name: null,
      },
      type: "Goal",
      detail: "Normal Goal",
      comments: null,
    },
    {
      time: {
        elapsed: 30,
        extra: null,
      },
      team: {
        id: 55,
        name: "Brentford",
        logo: "https://media.api-sports.io/football/teams/55.png",
      },
      player: {
        id: 18917,
        name: "B. Mee",
      },
      assist: {
        id: 19974,
        name: "I. Toney",
      },
      type: "Goal",
      detail: "Normal Goal",
      comments: null,
    },
    {
      time: {
        elapsed: 32,
        extra: null,
      },
      team: {
        id: 55,
        name: "Brentford",
        logo: "https://media.api-sports.io/football/teams/55.png",
      },
      player: {
        id: 18917,
        name: "Ben Mee",
      },
      assist: {
        id: null,
        name: null,
      },
      type: "Var",
      detail: "Goal confirmed",
      comments: null,
    },
    {
      time: {
        elapsed: 35,
        extra: null,
      },
      team: {
        id: 55,
        name: "Brentford",
        logo: "https://media.api-sports.io/football/teams/55.png",
      },
      player: {
        id: 20589,
        name: "B. Mbeumo",
      },
      assist: {
        id: 19974,
        name: "I. Toney",
      },
      type: "Goal",
      detail: "Normal Goal",
      comments: null,
    },
    {
      time: {
        elapsed: 46,
        extra: null,
      },
      team: {
        id: 33,
        name: "Manchester United",
        logo: "https://media.api-sports.io/football/teams/33.png",
      },
      player: {
        id: 2467,
        name: "L. Martínez",
      },
      assist: {
        id: 742,
        name: "R. Varane",
      },
      type: "subst",
      detail: "Substitution 1",
      comments: null,
    },
    {
      time: {
        elapsed: 46,
        extra: null,
      },
      team: {
        id: 33,
        name: "Manchester United",
        logo: "https://media.api-sports.io/football/teams/33.png",
      },
      player: {
        id: 891,
        name: "L. Shaw",
      },
      assist: {
        id: 37145,
        name: "T. Malacia",
      },
      type: "subst",
      detail: "Substitution 2",
      comments: null,
    },
    {
      time: {
        elapsed: 46,
        extra: null,
      },
      team: {
        id: 33,
        name: "Manchester United",
        logo: "https://media.api-sports.io/football/teams/33.png",
      },
      player: {
        id: 905,
        name: "Fred",
      },
      assist: {
        id: 903,
        name: "S. McTominay",
      },
      type: "subst",
      detail: "Substitution 3",
      comments: null,
    },
    {
      time: {
        elapsed: 60,
        extra: null,
      },
      team: {
        id: 33,
        name: "Manchester United",
        logo: "https://media.api-sports.io/football/teams/33.png",
      },
      player: {
        id: 18,
        name: "J. Sancho",
      },
      assist: {
        id: 153430,
        name: "A. Elanga",
      },
      type: "subst",
      detail: "Substitution 4",
      comments: null,
    },
    {
      time: {
        elapsed: 62,
        extra: null,
      },
      team: {
        id: 55,
        name: "Brentford",
        logo: "https://media.api-sports.io/football/teams/55.png",
      },
      player: {
        id: 19362,
        name: "J. Dasilva",
      },
      assist: {
        id: 25073,
        name: "V. Janelt",
      },
      type: "subst",
      detail: "Substitution 1",
      comments: null,
    },
    {
      time: {
        elapsed: 73,
        extra: null,
      },
      team: {
        id: 55,
        name: "Brentford",
        logo: "https://media.api-sports.io/football/teams/55.png",
      },
      player: {
        id: 20589,
        name: "B. Mbeumo",
      },
      assist: {
        id: 20649,
        name: "Y. Wissa",
      },
      type: "subst",
      detail: "Substitution 2",
      comments: null,
    },
    {
      time: {
        elapsed: 74,
        extra: null,
      },
      team: {
        id: 55,
        name: "Brentford",
        logo: "https://media.api-sports.io/football/teams/55.png",
      },
      player: {
        id: 47438,
        name: "M. Jensen",
      },
      assist: {
        id: 20110,
        name: "S. Baptiste",
      },
      type: "subst",
      detail: "Substitution 3",
      comments: null,
    },
    {
      time: {
        elapsed: 80,
        extra: null,
      },
      team: {
        id: 55,
        name: "Brentford",
        logo: "https://media.api-sports.io/football/teams/55.png",
      },
      player: {
        id: 44871,
        name: "A. Hickey",
      },
      assist: {
        id: 19345,
        name: "M. Sørensen",
      },
      type: "subst",
      detail: "Substitution 4",
      comments: null,
    },
    {
      time: {
        elapsed: 80,
        extra: null,
      },
      team: {
        id: 55,
        name: "Brentford",
        logo: "https://media.api-sports.io/football/teams/55.png",
      },
      player: {
        id: 30407,
        name: "C. Nørgaard",
      },
      assist: {
        id: 15799,
        name: "F. Onyeka",
      },
      type: "subst",
      detail: "Substitution 5",
      comments: null,
    },
    {
      time: {
        elapsed: 82,
        extra: null,
      },
      team: {
        id: 33,
        name: "Manchester United",
        logo: "https://media.api-sports.io/football/teams/33.png",
      },
      player: {
        id: 903,
        name: "Scott McTominay",
      },
      assist: {
        id: null,
        name: null,
      },
      type: "Card",
      detail: "Yellow Card",
      comments: "Foul",
    },
    {
      time: {
        elapsed: 87,
        extra: null,
      },
      team: {
        id: 33,
        name: "Manchester United",
        logo: "https://media.api-sports.io/football/teams/33.png",
      },
      player: {
        id: 174,
        name: "C. Eriksen",
      },
      assist: {
        id: 547,
        name: "D. van de Beek",
      },
      type: "subst",
      detail: "Substitution 5",
      comments: null,
    },
    {
      time: {
        elapsed: 89,
        extra: null,
      },
      team: {
        id: 33,
        name: "Manchester United",
        logo: "https://media.api-sports.io/football/teams/33.png",
      },
      player: {
        id: 909,
        name: "Marcus Rashford",
      },
      assist: {
        id: null,
        name: null,
      },
      type: "Card",
      detail: "Yellow Card",
      comments: "Foul",
    },
    {
      time: {
        elapsed: 90,
        extra: 4,
      },
      team: {
        id: 33,
        name: "Manchester United",
        logo: "https://media.api-sports.io/football/teams/33.png",
      },
      player: {
        id: 1485,
        name: "Bruno Fernandes",
      },
      assist: {
        id: null,
        name: null,
      },
      type: "Card",
      detail: "Yellow Card",
      comments: "Argument",
    },
  ],
  lineups: [
    {
      team: {
        id: 55,
        name: "Brentford",
        logo: "https://media.api-sports.io/football/teams/55.png",
        colors: {
          player: {
            primary: "ff0000",
            number: "000000",
            border: "ff0000",
          },
          goalkeeper: {
            primary: "0099cc",
            number: "000000",
            border: "0099cc",
          },
        },
      },
      coach: {
        id: 90,
        name: "T. Frank",
        photo: "https://media.api-sports.io/football/coachs/90.png",
      },
      formation: "5-3-2",
      startXI: [
        {
          player: {
            id: 19465,
            name: "David Raya",
            number: 1,
            pos: "G",
            grid: "1:1",
          },
        },
        {
          player: {
            id: 19124,
            name: "P. Jansson",
            number: 18,
            pos: "D",
            grid: "2:5",
          },
        },
        {
          player: {
            id: 18917,
            name: "B. Mee",
            number: 16,
            pos: "D",
            grid: "2:4",
          },
        },
        {
          player: {
            id: 19346,
            name: "R. Henry",
            number: 3,
            pos: "D",
            grid: "2:3",
          },
        },
        {
          player: {
            id: 15745,
            name: "M. Rasmussen",
            number: 30,
            pos: "D",
            grid: "2:2",
          },
        },
        {
          player: {
            id: 44871,
            name: "A. Hickey",
            number: 2,
            pos: "D",
            grid: "2:1",
          },
        },
        {
          player: {
            id: 30407,
            name: "C. Nørgaard",
            number: 6,
            pos: "M",
            grid: "3:3",
          },
        },
        {
          player: {
            id: 47438,
            name: "M. Jensen",
            number: 8,
            pos: "M",
            grid: "3:2",
          },
        },
        {
          player: {
            id: 19974,
            name: "I. Toney",
            number: 17,
            pos: "F",
            grid: "3:1",
          },
        },
        {
          player: {
            id: 19362,
            name: "J. Dasilva",
            number: 10,
            pos: "M",
            grid: "4:2",
          },
        },
        {
          player: {
            id: 20589,
            name: "B. Mbeumo",
            number: 19,
            pos: "F",
            grid: "4:1",
          },
        },
      ],
      substitutes: [
        {
          player: {
            id: 25073,
            name: "V. Janelt",
            number: 27,
            pos: "M",
            grid: null,
          },
        },
        {
          player: {
            id: 20649,
            name: "Y. Wissa",
            number: 11,
            pos: "M",
            grid: null,
          },
        },
        {
          player: {
            id: 20110,
            name: "S. Baptiste",
            number: 26,
            pos: "M",
            grid: null,
          },
        },
        {
          player: {
            id: 15799,
            name: "F. Onyeka",
            number: 15,
            pos: "M",
            grid: null,
          },
        },
        {
          player: {
            id: 19345,
            name: "M. Sørensen",
            number: 29,
            pos: "D",
            grid: null,
          },
        },
        {
          player: {
            id: 106725,
            name: "K. Lewis-Potter",
            number: 23,
            pos: "F",
            grid: null,
          },
        },
        {
          player: {
            id: 15908,
            name: "M. Damsgaard",
            number: 24,
            pos: "M",
            grid: null,
          },
        },
        {
          player: {
            id: 2699,
            name: "S. Ghoddos",
            number: 14,
            pos: "F",
            grid: null,
          },
        },
        {
          player: {
            id: 1835,
            name: "T. Strakosha",
            number: 22,
            pos: "G",
            grid: null,
          },
        },
      ],
    },
    {
      team: {
        id: 33,
        name: "Manchester United",
        logo: "https://media.api-sports.io/football/teams/33.png",
        colors: {
          player: {
            primary: "7dcbe3",
            number: "fe666e",
            border: "7dcbe3",
          },
          goalkeeper: {
            primary: "666666",
            number: "ffffff",
            border: "666666",
          },
        },
      },
      coach: {
        id: 1993,
        name: "E. ten Hag",
        photo: "https://media.api-sports.io/football/coachs/1993.png",
      },
      formation: "4-2-3-1",
      startXI: [
        {
          player: {
            id: 882,
            name: "David de Gea",
            number: 1,
            pos: "G",
            grid: "1:1",
          },
        },
        {
          player: {
            id: 2935,
            name: "H. Maguire",
            number: 5,
            pos: "D",
            grid: "2:4",
          },
        },
        {
          player: {
            id: 891,
            name: "L. Shaw",
            number: 23,
            pos: "D",
            grid: "2:3",
          },
        },
        {
          player: {
            id: 886,
            name: "Diogo Dalot",
            number: 20,
            pos: "D",
            grid: "2:2",
          },
        },
        {
          player: {
            id: 2467,
            name: "L. Martínez",
            number: 6,
            pos: "D",
            grid: "2:1",
          },
        },
        {
          player: {
            id: 174,
            name: "C. Eriksen",
            number: 14,
            pos: "M",
            grid: "3:2",
          },
        },
        {
          player: {
            id: 905,
            name: "Fred",
            number: 17,
            pos: "M",
            grid: "3:1",
          },
        },
        {
          player: {
            id: 1485,
            name: "Bruno Fernandes",
            number: 8,
            pos: "M",
            grid: "4:3",
          },
        },
        {
          player: {
            id: 874,
            name: "Cristiano Ronaldo",
            number: 7,
            pos: "F",
            grid: "4:2",
          },
        },
        {
          player: {
            id: 909,
            name: "M. Rashford",
            number: 10,
            pos: "M",
            grid: "4:1",
          },
        },
        {
          player: {
            id: 18,
            name: "J. Sancho",
            number: 25,
            pos: "M",
            grid: "5:1",
          },
        },
      ],
      substitutes: [
        {
          player: {
            id: 742,
            name: "R. Varane",
            number: 19,
            pos: "D",
            grid: null,
          },
        },
        {
          player: {
            id: 37145,
            name: "T. Malacia",
            number: 12,
            pos: "D",
            grid: null,
          },
        },
        {
          player: {
            id: 903,
            name: "S. McTominay",
            number: 39,
            pos: "M",
            grid: null,
          },
        },
        {
          player: {
            id: 153430,
            name: "A. Elanga",
            number: 36,
            pos: "F",
            grid: null,
          },
        },
        {
          player: {
            id: 547,
            name: "D. van de Beek",
            number: 34,
            pos: "M",
            grid: null,
          },
        },
        {
          player: {
            id: 18846,
            name: "A. Wan-Bissaka",
            number: 29,
            pos: "D",
            grid: null,
          },
        },
        {
          player: {
            id: 284324,
            name: "Alejandro Garnacho",
            number: 49,
            pos: "M",
            grid: null,
          },
        },
        {
          player: {
            id: 895,
            name: "J. Garner",
            number: 37,
            pos: "M",
            grid: null,
          },
        },
        {
          player: {
            id: 2931,
            name: "T. Heaton",
            number: 22,
            pos: "G",
            grid: null,
          },
        },
      ],
    },
  ],
  statistics: [
    {
      team: {
        id: 55,
        name: "Brentford",
        logo: "https://media.api-sports.io/football/teams/55.png",
      },
      statistics: [
        {
          type: "Shots on Goal",
          value: 7,
        },
        {
          type: "Shots off Goal",
          value: 3,
        },
        {
          type: "Total Shots",
          value: 13,
        },
        {
          type: "Blocked Shots",
          value: 3,
        },
        {
          type: "Shots insidebox",
          value: 7,
        },
        {
          type: "Shots outsidebox",
          value: 6,
        },
        {
          type: "Fouls",
          value: 6,
        },
        {
          type: "Corner Kicks",
          value: 8,
        },
        {
          type: "Offsides",
          value: 1,
        },
        {
          type: "Ball Possession",
          value: "33%",
        },
        {
          type: "Yellow Cards",
          value: null,
        },
        {
          type: "Red Cards",
          value: null,
        },
        {
          type: "Goalkeeper Saves",
          value: 4,
        },
        {
          type: "Total passes",
          value: 255,
        },
        {
          type: "Passes accurate",
          value: 169,
        },
        {
          type: "Passes %",
          value: "66%",
        },
      ],
    },
    {
      team: {
        id: 33,
        name: "Manchester United",
        logo: "https://media.api-sports.io/football/teams/33.png",
      },
      statistics: [
        {
          type: "Shots on Goal",
          value: 4,
        },
        {
          type: "Shots off Goal",
          value: 7,
        },
        {
          type: "Total Shots",
          value: 15,
        },
        {
          type: "Blocked Shots",
          value: 4,
        },
        {
          type: "Shots insidebox",
          value: 7,
        },
        {
          type: "Shots outsidebox",
          value: 8,
        },
        {
          type: "Fouls",
          value: 15,
        },
        {
          type: "Corner Kicks",
          value: 2,
        },
        {
          type: "Offsides",
          value: 2,
        },
        {
          type: "Ball Possession",
          value: "67%",
        },
        {
          type: "Yellow Cards",
          value: 4,
        },
        {
          type: "Red Cards",
          value: null,
        },
        {
          type: "Goalkeeper Saves",
          value: 3,
        },
        {
          type: "Total passes",
          value: 521,
        },
        {
          type: "Passes accurate",
          value: 439,
        },
        {
          type: "Passes %",
          value: "84%",
        },
      ],
    },
  ],
}).reset(fetchSingleFixtureFx.failData);
export const $singleFixtureError = createStore("").reset(fetchSingleFixtureFx);
export const $singleFixtureLoading = fetchSingleFixtureFx.pending;

// sample({
//   clock: singleFixtureSet,
//   target: fetchSingleFixtureFx,
// });

sample({
  clock: fetchSingleFixtureFx.failData,
  fn: ({ message }) => message,
  target: $singleFixtureError,
});
