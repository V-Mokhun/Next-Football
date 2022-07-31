import { FixtureMatch } from "@/entities/fixture";
import { leagueModel, LeagueRoundsSelect } from "@/entities/league";
import { MATCHES_ROUTE } from "@/shared/lib";
import { AlertMessage, CardBlock } from "@/shared/ui";
import { Box, Flex, Heading, Link, Spinner, Text } from "@chakra-ui/react";
import { useStore, useStoreMap } from "effector-react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface LeagueMatchesProps {
  isMatchesPage?: boolean;
}

export const LeagueMatches: React.FC<LeagueMatchesProps> = ({
  isMatchesPage = false,
}) => {
  const router = useRouter();
  const matchesError = useStore(leagueModel.$leagueFixturesError);
  const matchesLoading = useStore(leagueModel.$leagueFixturesLoading);
  const list = useStoreMap({
    store: leagueModel.$leagueFixtures,
    keys: [],
    fn: (leagueFixture) => {
      if (!leagueFixture) return null;

      const roundName = Object.keys(leagueFixture)[0];
      const matches = leagueFixture[roundName].map((matchFixture) => (
        <FixtureMatch
          key={matchFixture.fixture.id}
          fixtureData={matchFixture}
          hoursOnlyDate={false}
        />
      ));

      return (
        <Box mb={4}>
          <Heading
            backgroundColor="main.400"
            py={1}
            px={3}
            borderRadius="8px"
            as="h2"
            fontSize="md"
          >
            {roundName}
          </Heading>
          <Box>{matches}</Box>
        </Box>
      );
    },
  });

  let body = null;

  if (matchesLoading) {
    body = (
      <Flex justifyContent="center" mb={2}>
        <Spinner size="xl" />
      </Flex>
    );
  } else if (matchesError) {
    body = <AlertMessage error={matchesError} />;
  } else if ((Array.isArray(list) && list.length < 1) || !list) {
    body = <Text textAlign="center">No matches found.</Text>;
  } else if (isMatchesPage) {
    body = (
      <>
        <LeagueRoundsSelect />
        {list}
      </>
    );
  } else {
    body = (
      <>
        {list}
        <Flex justifyContent="center" mt={3} mb={1}>
          <NextLink href={`${router.asPath}/${MATCHES_ROUTE}`} passHref>
            <Link fontWeight={700} fontSize="sm">
              See more matches
            </Link>
          </NextLink>
        </Flex>
      </>
    );
  }

  return <CardBlock>{body}</CardBlock>;
};
