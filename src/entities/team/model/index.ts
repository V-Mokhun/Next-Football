import { rapidApi, TeamResponse } from "@/shared/api";
import { createEffect, createEvent, forward, restore } from "effector";

export const teamSet = createEvent<number>();

export const fetchTeamFx = createEffect<number, TeamResponse, Error>(
  async (id) => {
    const { response } = await rapidApi.teamsApi.getTeams({ id });

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

$team.watch((s) => console.log(s));

// forward({
//   from: teamSet,
//   to: fetchTeamFx,
// });
