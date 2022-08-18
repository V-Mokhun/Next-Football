import { fixtureModel } from "@/entities/fixture";
import { Text } from "@chakra-ui/react";
import { useStoreMap } from "effector-react";
import { SingleFixtureStatisticsItem } from "./SingleFixtureStatisticsItem";

export const SingleFixtureStatistics = () => {
  const statistics = useStoreMap({
    store: fixtureModel.singleFixtureSubmodel.$singleFixture,
    keys: [],
    fn: (fixture) => (fixture ? fixture.statistics : []),
  });

  if (statistics.length === 0) return <Text>No statistics found.</Text>;

  const [homeTeamStatistics, awayTeamStatistics] = statistics;

  return (
    <>
      {homeTeamStatistics.statistics.map((stat) => {
        return (
          <SingleFixtureStatisticsItem
            key={stat.type}
            homeStatistic={stat}
            awayStatistic={
              awayTeamStatistics.statistics.find((s) => s.type === stat.type) ||
              null
            }
          />
        );
      })}
    </>
  );
};
