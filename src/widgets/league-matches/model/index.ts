import { leagueModel } from "@/entities/league";
import { viewerModel } from "@/entities/viewer";
import { FixturesQueryParams, RoundsQueryParams } from "@/shared/api";
import { createEvent, sample } from "effector";

export const fetchLeagueRounds = createEvent();

sample({
  clock: [leagueModel.$isCurrentRound, fetchLeagueRounds],
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
  clock: [viewerModel.$viewerTimezone, leagueModel.$activeRound],
  source: {
    timezone: viewerModel.$viewerTimezone,
    leagueFixture: leagueModel.$league,
    round: leagueModel.$activeRound,
  },
  filter: ({ leagueFixture, round }) =>
    Boolean(leagueFixture) && Boolean(round),
  fn: ({ timezone, leagueFixture, round }): FixturesQueryParams => {
    const params: FixturesQueryParams = {
      league: leagueFixture!.league.id,
      season: leagueFixture!.seasons[0].year,
      round: round as string,
    };

    if (timezone) {
      params.timezone = timezone;
    }

    return params;
  },
  target: leagueModel.fetchLeagueFixturesFx,
});
