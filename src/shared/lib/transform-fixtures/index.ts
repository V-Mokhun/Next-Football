import { FixtureResponse, League } from "@/shared/api";
import { Event, sample, Store } from "effector";

export const transformFixtures = (
  clock: Event<FixtureResponse[]>,
  target: Store<{ [key: string]: FixtureResponse[] } | null>,
  roundAsKey = false
) => {
  sample({
    clock,
    filter: (fixtures) => Boolean(fixtures[0]),
    fn: (fixtures) => {
      const sortedFixtures = fixtures.sort(
        (a, b) => a.fixture.timestamp - b.fixture.timestamp
      );

      if (roundAsKey) {
        return { [sortedFixtures[0].league.round]: sortedFixtures };
      }

      return { [sortedFixtures[0].league.name]: sortedFixtures };
    },
    target,
  });
};

export const transformManyFixtures = (
  clock: Event<FixtureResponse[]>,
  target: Store<
    {
      [key: string]: FixtureResponse[];
    }[]
  >,
  source?: Store<League[]>
) => {
  if (source) {
    sample({
      clock,
      source,
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
      target,
    });
  } else {
    sample({
      clock,
      fn: (fixtures) => {
        const sortedFixtures: { [key: string]: FixtureResponse[] }[] = [];

        for (const fixture of fixtures) {
          const leagueName = fixture.league.name;
          const fixtureItem = sortedFixtures.find((f) => f[leagueName]);

          if (fixtureItem) {
            fixtureItem[leagueName].push(fixture);
          } else {
            sortedFixtures.push({ [leagueName]: [fixture] });
          }
        }

        return sortedFixtures;
      },
      target,
    });
  }
};
