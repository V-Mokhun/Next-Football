import { teamModel } from "@/entities/team";
import { createEvent, restore, sample } from "effector";
import { StaticPageContext } from "nextjs-effector";
import { setEntityByParamsId } from "../shared";

export const pageStarted = createEvent<StaticPageContext>();
const paramsIdReceived = createEvent<number>();
const $teamId = restore(paramsIdReceived, null);

setEntityByParamsId(pageStarted, [paramsIdReceived]);

sample({
  clock: $teamId,
  filter: (id): id is number => id != null,
  target: teamModel.teamSet,
});

sample({
  clock: teamModel.$team,
  filter: (team) => team?.team.id != null,
  fn: (team) => team?.team.id as number,
  target: teamModel.fetchTeamSquad,
});
