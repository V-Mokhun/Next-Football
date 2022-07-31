import { FixtureLeague, FixtureMatch, fixtureModel } from "@/entities/fixture";
import { viewerModel } from "@/entities/viewer";
import { FavoriteLeagueButton } from "@/features/toggle-favorite/toggle-favorite-league";
import { AlertMessage } from "@/shared/ui";
import { Accordion, Flex, Spinner, Text } from "@chakra-ui/react";
import { useList, useStore } from "effector-react";
import React from "react";

interface MatchesProps {}

export const Matches: React.FC<MatchesProps> = ({}) => {
  const isAuthenticated = useStore(viewerModel.$isAuthenticated);
  const viewerFavoriteLeagues = useStore(viewerModel.$viewerFavoriteLeagues);
  const fixturesError = useStore(fixtureModel.$fixturesError);
  const fixturesLoading = useStore(fixtureModel.$fixutresLoading);

  const list = useList(fixtureModel.$fixtures, {
    keys: [viewerFavoriteLeagues],
    fn: (fixtureObj) => {
      const fixtures = Object.values(fixtureObj)[0];

      if (fixtures.length <= 0) return null;

      const isFavoriteLeague = viewerFavoriteLeagues.find(
        (league) => league.id === fixtures[0].league.id
      );

      const matches = fixtures.map((fixture) => (
        <FixtureMatch key={fixture.fixture.id} fixtureData={fixture} />
      ));

      return (
        <FixtureLeague
          isFavorite={Boolean(isFavoriteLeague)}
          FavoriteComponent={isAuthenticated ? FavoriteLeagueButton : null}
          league={fixtures[0].league}
          matches={matches}
          matchesQuantity={matches.length}
        />
      );
    },
  });

  let body = null;

  if (fixturesError) {
    body = <AlertMessage mb={2} error={fixturesError} />;
  } else if (fixturesLoading) {
    body = (
      <Flex justifyContent="center" mb={2}>
        <Spinner size="xl" />
      </Flex>
    );
  } else if (Array.isArray(list) && list.length < 1) {
    body = (
      <Text mb={4} textAlign="center">
        No matches found.
      </Text>
    );
  } else {
    body = (
      <Accordion pb={4} allowMultiple>
        {list}
      </Accordion>
    );
  }

  return body;
};
