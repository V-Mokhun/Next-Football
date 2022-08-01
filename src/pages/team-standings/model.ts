import { teamModel } from "@/entities/team";
import { createEvent } from "effector";
import { StaticPageContext } from "nextjs-effector";
import { setEntityByParamsId } from "../shared";

export const pageStarted = createEvent<StaticPageContext>();

setEntityByParamsId(pageStarted, [
  teamModel.teamSet,
  teamModel.fetchTeamSeason,
  teamModel.fetchTeamStandings,
]);
