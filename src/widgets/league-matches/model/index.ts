import { leagueModel } from "@/entities/league";
import { viewerModel } from "@/entities/viewer";
import { FixturesQueryParams, RoundsQueryParams } from "@/shared/api";
import { createEvent, sample } from "effector";

export const fetchLeagueRounds = createEvent();

sample({
  clock: fetchLeagueRounds,
  source: {
    leagueFixture: leagueModel.$league,
    isCurrent: leagueModel.$isCurrentRound,
  },
  filter: ({ leagueFixture }) => Boolean(leagueFixture),
  fn: ({ leagueFixture, isCurrent }): RoundsQueryParams => ({
    league: leagueFixture!.league.id,
    season: leagueFixture!.seasons[0].year,
    current: isCurrent,
  }),
  target: leagueModel.fetchLeagueRoundsFx,
});

sample({
  clock: [
    // viewerModel.$viewerTimezone,
    leagueModel.$leagueRounds,
  ],
  source: {
    timezone: viewerModel.$viewerTimezone,
    leagueFixture: leagueModel.$league,
    rounds: leagueModel.$leagueRounds,
  },
  filter: ({ leagueFixture, timezone }) =>
    Boolean(leagueFixture) || Boolean(timezone),
  fn: ({ timezone, leagueFixture, rounds }): FixturesQueryParams => {
    return {
      timezone,
      league: leagueFixture!.league.id,
      season: leagueFixture!.seasons[0].year,
      round: rounds[0],
    };
  },
  target: leagueModel.fetchLeagueFixturesFx,
});
