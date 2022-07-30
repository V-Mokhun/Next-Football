import { FixtureMatch } from "@/entities/fixture";
import { leagueModel, LeagueRoundsSelect } from "@/entities/league";
import { Box, Heading, Text } from "@chakra-ui/react";
import { useList } from "effector-react";
import React from "react";

interface LeagueMatchesProps {}

export const LeagueMatches: React.FC<LeagueMatchesProps> = ({}) => {
  const list = useList(leagueModel.$leagueFixtures, {
    fn: (leagueFixture) => {
      const roundName = Object.keys(leagueFixture)[0];
      const matches = leagueFixture[roundName].map((matchFixture) => (
        <FixtureMatch
          key={matchFixture.fixture.id}
          fixtureData={matchFixture}
          hoursOnlyDate={false}
        />
      ));

      return (
        <Box>
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
    <Box borderRadius="8px" p="12px" backgroundColor="main.500">
      {Array.isArray(list) && list.length < 1 ? (
        <Text textAlign="center">No matches found.</Text>
      ) : (
        <>
          <LeagueRoundsSelect />
          {list}
        </>
      )}
    </Box>
  );
};
