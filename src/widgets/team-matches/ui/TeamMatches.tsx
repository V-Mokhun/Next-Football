import { FixtureLeague, FixtureMatch } from "@/entities/fixture";
import { teamModel } from "@/entities/team";
import { viewerModel } from "@/entities/viewer";
import { FavoriteLeagueButton } from "@/features/toggle-favorite/toggle-favorite-league";
import { AlertMessage, CardBlock } from "@/shared/ui";
import { Box, Flex, Heading, Link, Spinner, Text } from "@chakra-ui/react";
import { useList, useStore } from "effector-react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface TeamMatchesProps {
  loading: boolean;
  error: string;
  store: typeof teamModel.$lastMatches;
  title: string;
  route: string;
}

export const TeamMatches: React.FC<TeamMatchesProps> = ({
  loading,
  store,
  error,
  title,
  route,
}) => {
  const isAuthenticated = useStore(viewerModel.$isAuthenticated);
  const viewerFavoriteLeagues = useStore(viewerModel.$viewerFavoriteLeagues);
  const router = useRouter();

  const list = useList(store, {
    keys: [viewerFavoriteLeagues],
    fn: (matchesData) => {
      if (Object.values(matchesData)[0].length < 1) return null;

      const leagueName = Object.keys(matchesData)[0];
      const match = matchesData[leagueName][0];

      const isFavoriteLeague = viewerFavoriteLeagues.find(
        (league) => league.id === match.league.id
      );

      const matches = matchesData[leagueName].map((matchFixture) => (
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

  let body = null;

  if (error) {
    body = <AlertMessage error={error} />;
  } else if (loading) {
    body = (
      <Flex justifyContent="center" mb={2}>
        <Spinner size="xl" />
      </Flex>
    );
  } else if ((Array.isArray(list) && list.length < 1) || !list) {
    body = (
      <CardBlock mb={4}>
        <Box mb={2}>
          <Heading as="h2" fontSize="xl" mb={4}>
            {title}
          </Heading>
          <Text mb={4} textAlign="center">
            No matches found.
          </Text>
        </Box>
      </CardBlock>
    );
  } else {
    body = (
      <CardBlock mb={4}>
        <Box mb={2}>
          <Heading as="h2" fontSize="xl" mb={4}>
            {title}
          </Heading>
          {list}
        </Box>
        <Flex justifyContent="center">
          <NextLink href={`${router.asPath}/${route}`} passHref>
            <Link fontWeight={700} fontSize="sm">
              See more matches
            </Link>
          </NextLink>
        </Flex>
      </CardBlock>
    );
  }

  return body;
};
