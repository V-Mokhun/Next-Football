import { calendarModel } from "@/entities/calendar";
import { fixtureModel } from "@/entities/fixture";
import { viewerModel } from "@/entities/viewer";
import { FixtureResponse, FixturesQueryParams } from "@/shared/api";
import { createEvent, sample } from "effector";

export const fetchFixtures = createEvent();

sample({
  clock: [
    fetchFixtures,
    calendarModel.$selectedDate,
    fixtureModel.allFixturesSelected,
    fixtureModel.liveFixturesSelected,
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

sample({
  clock: fixtureModel.fetchFixturesFx.doneData,
  source: viewerModel.$viewerFavoriteLeagues,
  fn: (favoriteLeagues, fixtures) => {
    const sortedFixtures: { [key: string]: FixtureResponse[] }[] = [];

    for (const fixture of fixtures) {
      const leagueName = fixture.league.name;
      const fixtureItem = sortedFixtures.find((f) => f[leagueName]);

      if (fixtureItem) {
        fixtureItem[leagueName].push(fixture);
      } else {
        const isFavoriteLeague = favoriteLeagues.find(
          (league) => league.id === fixture.league.id
        );
        if (isFavoriteLeague) {
          sortedFixtures.unshift({ [leagueName]: [fixture] });
        } else {
          sortedFixtures.push({ [leagueName]: [fixture] });
        }
      }
    }

    return sortedFixtures;
  },
  target: fixtureModel.$fixtures,
});

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
