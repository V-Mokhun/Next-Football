import { FixtureResponse } from "@/shared/api";
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
