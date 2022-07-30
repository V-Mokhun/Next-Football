import { leagueModel } from "@/entities/league";
import { createEvent, sample } from "effector";
import { StaticPageContext } from "nextjs-effector";

export const pageStarted = createEvent<StaticPageContext>();

// sample({
//   clock: pageStarted,
//   filter: ({ params }) => Boolean(params?.id),
//   fn: ({ params }) => parseInt(params!.id as string, 10),
//   target: leagueModel.leagueSet,
// });

sample({
  clock: leagueModel.$league,
  target: [
    // leagueMatchesModel.fetchLeagueRounds,
    // leagueStandingsModel.fetchLeagueStandings,
  ],
});
