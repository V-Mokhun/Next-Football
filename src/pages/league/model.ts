import { leagueMatchesModel } from "@/widgets/league-matches";
import { createEvent, sample } from "effector";

export const pageStarted = createEvent();

// sample({
//   clock: pageStarted,
//   target: leagueMatchesModel.fetchLeagueFixtures,
// });
