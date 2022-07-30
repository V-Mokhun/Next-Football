import { FixtureMatch } from "@/entities/fixture";
import { leagueModel } from "@/entities/league";
import { LEAGUE_MATCHES_ROUTE } from "@/shared/lib";
import { Box, Flex, Heading, Link } from "@chakra-ui/react";
import { useList } from "effector-react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface LeagueCurrentMatchesProps {}

export const LeagueCurrentMatches: React.FC<
  LeagueCurrentMatchesProps
> = ({}) => {
  const router = useRouter();
  const list = useList(leagueModel.$leagueFixtures, {
    fn: (leagueFixture, index) => {
      if (index !== 0) return null;

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

  return (
    <Box mb={4} borderRadius="8px" p="12px" backgroundColor="main.500">
      {list}
      <Flex justifyContent="center" mt={3} mb={1}>
        <NextLink href={`${router.asPath}/${LEAGUE_MATCHES_ROUTE}`} passHref>
          <Link fontWeight={700} fontSize="sm">
            See more matches
          </Link>
        </NextLink>
      </Flex>
    </Box>
  );
};
