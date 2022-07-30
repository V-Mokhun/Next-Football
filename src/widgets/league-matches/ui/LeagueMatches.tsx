import { FixtureMatch } from "@/entities/fixture";
import { leagueModel } from "@/entities/league";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { useEvent, useList } from "effector-react";
import React from "react";

interface LeagueMatchesProps {}

export const LeagueMatches: React.FC<LeagueMatchesProps> = ({}) => {
  const moreMatchesClicked = useEvent(leagueModel.moreMatchesClicked);
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
        <Button
          onClick={moreMatchesClicked}
          variant="link"
          fontWeight={700}
          fontSize="sm"
        >
          See more matches
        </Button>
      </Flex>
    </Box>
  );
};
