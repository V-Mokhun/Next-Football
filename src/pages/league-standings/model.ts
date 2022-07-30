import { leagueStandingsModel } from "@/widgets/league-standings";
import { createEvent, sample } from "effector";

export const pageStarted = createEvent();

sample({
  clock: pageStarted,
  target: [
    // leagueStandingsModel.fetchLeagueStandings,
  ],
});
