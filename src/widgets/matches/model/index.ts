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
    fixtureModel.$isLiveFixtures,
  ],
  source: {
    date: calendarModel.$selectedDate,
    timezone: viewerModel.$viewerTimezone,
    isLive: fixtureModel.$isLiveFixtures,
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
  target: fixtureModel.fetchFixturesFx,
});

transformManyFixtures(
  fixtureModel.fetchFixturesFx.doneData,
  fixtureModel.$fixtures,
  viewerModel.$viewerFavoriteLeagues
);

sample({
  clock: fixtureModel.fetchFixturesFx,
  fn: () => true,
  target: [calendarModel.$calendarDisabled, fixtureModel.$buttonsDisabled],
});

sample({
  clock: fixtureModel.fetchFixturesFx.failData,
  fn: (error) => error.message,
  target: fixtureModel.$fixturesError,
});

sample({
  clock: fixtureModel.fetchFixturesFx.finally,
  fn: () => false,
  target: [calendarModel.$calendarDisabled, fixtureModel.$buttonsDisabled],
});
