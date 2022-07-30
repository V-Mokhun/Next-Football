import { leagueModel } from "@/entities/league";
import { StandingsQueryParams } from "@/shared/api";
import { createEvent, sample } from "effector";

export const fetchLeagueStandings = createEvent();

sample({
  clock: fetchLeagueStandings,
  source: { leagueFixture: leagueModel.$league },
  filter: ({ leagueFixture }) =>
    Boolean(leagueFixture) ||
    Boolean(leagueFixture?.seasons[0].coverage.standings),
  fn: ({ leagueFixture }): StandingsQueryParams => {
    return {
      season: leagueFixture!.seasons[0].year,
      league: leagueFixture!.league.id,
    };
  },
  target: leagueModel.fetchLeagueStandingsFx,
});
