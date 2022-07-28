import { leagueModel } from "@/entities/league";
import { viewerModel } from "@/entities/viewer";
import { FixturesQueryParams } from "@/shared/api";
import { createEvent, sample } from "effector";

export const fetchLeagueFixtures = createEvent();

sample({
  clock: [
    fetchLeagueFixtures,
    leagueModel.leagueNextFixturesUpdated,
    viewerModel.$viewerTimezone,
  ],
  source: {
    timezone: viewerModel.$viewerTimezone,
    leagueFixture: leagueModel.$league,
    leagueNextFixtures: leagueModel.$leagueNextFixtures,
  },
  filter: ({ leagueFixture, timezone }) =>
    Boolean(leagueFixture) || Boolean(timezone),
  fn: ({
    timezone,
    leagueFixture,
    leagueNextFixtures,
  }): FixturesQueryParams => {
    if (!leagueFixture) return {};

    return {
      timezone,
      league: leagueFixture.league.id,
      next: leagueNextFixtures,
      season: leagueFixture.seasons[0].year,
    };
  },
  target: leagueModel.fetchLeagueFixturesFx,
});
