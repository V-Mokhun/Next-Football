import { calendarModel } from "@/entities/calendar";
import { fixtureModel } from "@/entities/fixture";
import { viewerModel } from "@/entities/viewer";
import { FixturesQueryParams } from "@/shared/api";
import { createEvent, sample } from "effector";

export const fetchFixtures = createEvent();

sample({
  clock: [fetchFixtures, calendarModel.$selectedDate],
  source: {
    date: calendarModel.$selectedDate,
    timezone: viewerModel.$viewerTimezone,
    isLive: fixtureModel.$isLiveFixtures,
  },
  fn({ date, timezone = "", isLive }): FixturesQueryParams {
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
