import { fixtureModel } from "@/entities/fixture";
import { viewerModel } from "@/entities/viewer";
import { createEvent, restore, sample } from "effector";
import { StaticPageContext } from "nextjs-effector";
import { setEntityByParamsId } from "../shared";

export const pageStarted = createEvent<StaticPageContext>();
const paramsIdReceived = createEvent<number>();
const $fixtureId = restore(paramsIdReceived, null);

setEntityByParamsId(pageStarted, [paramsIdReceived]);

sample({
  clock: [viewerModel.$viewerTimezone, paramsIdReceived],
  source: { timezone: viewerModel.$viewerTimezone, id: $fixtureId },
  filter: ({ id }) => id != null,
  fn: ({ timezone, id }) =>
    timezone?.length > 0 ? { timezone, id: id! } : { id: id! },
  target: fixtureModel.singleFixtureSubmodel.singleFixtureSet,
});
