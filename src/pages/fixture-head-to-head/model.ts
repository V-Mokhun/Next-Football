import { fixtureModel } from "@/entities/fixture";
import { viewerModel } from "@/entities/viewer";
import { HeadToHeadQueryParams } from "@/shared/api";
import { createEvent, restore, sample } from "effector";
import { StaticPageContext } from "nextjs-effector";
import { setEntityByParamsId } from "../shared";

export const pageStarted = createEvent<StaticPageContext>();
const paramsIdReceived = createEvent<number>();
const $fixtureId = restore(paramsIdReceived, null);

setEntityByParamsId(pageStarted, [paramsIdReceived]);

sample({
  clock: [viewerModel.$viewerTimezone, $fixtureId],
  source: { timezone: viewerModel.$viewerTimezone, id: $fixtureId },
  filter: ({ id }) => id != null,
  fn: ({ timezone, id }) =>
    timezone?.length > 0 ? { timezone, id: id! } : { id: id! },
  target: fixtureModel.singleFixtureSubmodel.singleFixtureSet,
});

sample({
  clock: [
    fixtureModel.singleFixtureSubmodel.$singleFixture,
    viewerModel.$viewerTimezone,
    pageStarted,
  ],
  source: {
    timezone: viewerModel.$viewerTimezone,
    id: $fixtureId,
    singleFixture: fixtureModel.singleFixtureSubmodel.$singleFixture,
  },
  filter: ({ id: fixtureId, singleFixture }) =>
    fixtureId != null && singleFixture != null,
  fn: ({ timezone, singleFixture }): HeadToHeadQueryParams =>
    timezone?.length > 0
      ? {
          timezone,
          last: 5,
          h2h: `${singleFixture!.teams.home.id}-${
            singleFixture!.teams.away.id
          }`,
        }
      : {
          last: 5,
          h2h: `${singleFixture!.teams.home.id}-${
            singleFixture!.teams.away.id
          }`,
        },
  target: fixtureModel.singleFixtureSubmodel.headToHeadSet,
});
