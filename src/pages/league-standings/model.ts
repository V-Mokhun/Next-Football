import { leagueModel } from "@/entities/league";
import { createEvent, sample } from "effector";
import { StaticPageContext } from "nextjs-effector";
import { setEntityByParamsId } from "../shared";

export const pageStarted = createEvent<StaticPageContext>();

setEntityByParamsId(pageStarted, [leagueModel.leagueSet]);

sample({
  clock: pageStarted,
  fn: () => true,
  target: leagueModel.currentRoundChanged,
});

sample({
  clock: leagueModel.$league,
  target: leagueModel.fetchLeagueStandings,
});
