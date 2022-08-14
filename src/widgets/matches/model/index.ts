import { calendarModel } from "@/entities/calendar";
import { fixtureModel } from "@/entities/fixture";
import { viewerModel } from "@/entities/viewer";
import { FixturesQueryParams } from "@/shared/api";
import { transformManyFixtures } from "@/shared/lib";
import { createEvent, sample } from "effector";

export const fetchFixtures = createEvent();

sample({
  clock: [
    fetchFixtures,
    calendarModel.$selectedDate,
    fixtureModel.fixturesSubmodel.$isLiveFixtures,
  ],
  source: {
    date: calendarModel.$selectedDate,
    timezone: viewerModel.$viewerTimezone,
    isLive: fixtureModel.fixturesSubmodel.$isLiveFixtures,
  },
  fn({ date, timezone, isLive }): FixturesQueryParams {
    const params: FixturesQueryParams = {};

    if (timezone) {
      params.timezone = timezone;
    }

    if (isLive) {
      params.live = "all";
      return params;
    }

    params.date = date;

    return params;
  },
  target: fixtureModel.fixturesSubmodel.fetchFixturesFx,
});

transformManyFixtures(
  fixtureModel.fixturesSubmodel.fetchFixturesFx.doneData,
  fixtureModel.fixturesSubmodel.$fixtures,
  viewerModel.$viewerFavoriteLeagues
);

sample({
  clock: fixtureModel.fixturesSubmodel.fetchFixturesFx,
  fn: () => true,
  target: [
    calendarModel.$calendarDisabled,
    fixtureModel.fixturesSubmodel.$buttonsDisabled,
  ],
});

sample({
  clock: fixtureModel.fixturesSubmodel.fetchFixturesFx.finally,
  fn: () => false,
  target: [
    calendarModel.$calendarDisabled,
    fixtureModel.fixturesSubmodel.$buttonsDisabled,
  ],
});
