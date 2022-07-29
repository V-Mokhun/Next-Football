import { FixtureMatch } from "@/entities/fixture";
import { leagueModel } from "@/entities/league";
import { LEAGUE_MATCHES_ROUTE } from "@/shared/lib";
import { Box, Flex, Heading, Link } from "@chakra-ui/react";
import { useList, useStore } from "effector-react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface LeagueMatchesProps {}

export const LeagueMatches: React.FC<LeagueMatchesProps> = ({}) => {
  const router = useRouter();
  const leagueRounds = useStore(leagueModel.$leagueRounds);
  const list = useList(leagueModel.$leagueFixtures, {
    fn: (leagueFixture) => (
      <FixtureMatch fixtureData={leagueFixture} hoursOnlyDate={false} />
    ),
  });

  return (
    <Box mb={4} borderRadius="8px" p="12px" backgroundColor="main.500">
      <Heading
        backgroundColor="main.400"
        py={1}
        px={3}
        borderRadius="8px"
        as="h2"
        fontSize="md"
      >
        {leagueRounds[0]}
      </Heading>
      <Box>{list}</Box>
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
