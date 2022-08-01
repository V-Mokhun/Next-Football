import { FixtureLeague, FixtureMatch } from "@/entities/fixture";
import { teamModel } from "@/entities/team";
import { viewerModel } from "@/entities/viewer";
import { FavoriteLeagueButton } from "@/features/toggle-favorite/toggle-favorite-league";
import { CardBlock } from "@/shared/ui";
import { Box, Flex, Heading, Spinner } from "@chakra-ui/react";
import { useStore, useStoreMap } from "effector-react";
import React from "react";

interface TeamTodayMatchesProps {}

export const TeamTodayMatches: React.FC<TeamTodayMatchesProps> = ({}) => {
  const viewerFavoriteLeagues = useStore(viewerModel.$viewerFavoriteLeagues);
  const isAuthenticated = useStore(viewerModel.$isAuthenticated);
  const loading = useStore(teamModel.$todayMatchesLoading);

  const list = useStoreMap({
    store: teamModel.$todayMatches,
    keys: [viewerFavoriteLeagues],
    fn: (todayMatches) => {
      if (!todayMatches) return null;

      const leagueName = Object.keys(todayMatches)[0];
      const match = todayMatches[leagueName][0];

      const isFavoriteLeague = viewerFavoriteLeagues.find(
        (league) => league.id === match.league.id
      );

      const matches = todayMatches[leagueName].map((matchFixture) => (
        <FixtureMatch
          key={matchFixture.fixture.id}
          fixtureData={matchFixture}
          hoursOnlyDate={false}
        />
      ));

      return (
        <FixtureLeague
          isFavorite={Boolean(isFavoriteLeague)}
          FavoriteComponent={isAuthenticated ? FavoriteLeagueButton : null}
          league={match.league}
          matches={matches}
          matchesQuantity={matches.length}
          isAccordion={false}
        />
      );
    },
  });

  return loading ? (
    <Flex justifyContent="center" mb={2}>
      <Spinner size="xl" />
    </Flex>
  ) : (
    <CardBlock>
      <Box mb={4}>
        <Heading as="h2" fontSize="xl" mb={4}>
          Today`s matches
        </Heading>
        {list}
      </Box>
    </CardBlock>
  );
};
