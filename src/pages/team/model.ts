import { TeamMatchesLimit, teamModel } from "@/entities/team";
import { createEvent, sample } from "effector";
import { StaticPageContext } from "nextjs-effector";
import { setEntityByParamsId } from "../shared";

export const pageStarted = createEvent<StaticPageContext>();

sample({
  clock: pageStarted,
  source: teamModel.$lastMatchesCount,
  filter: (count) => count !== 10,
  fn: (): TeamMatchesLimit => 10,
  target: teamModel.lastMatchesCountUpdated,
});

sample({
  clock: pageStarted,
  source: teamModel.$nextMatchesCount,
  filter: (count) => count !== 10,
  fn: (): TeamMatchesLimit => 10,
  target: teamModel.nextMatchesCountUpdated,
});

setEntityByParamsId(pageStarted, [
  teamModel.teamSet,
  teamModel.fetchTeamSeason,
]);
