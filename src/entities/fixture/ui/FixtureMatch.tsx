import { FixtureResponse, FixtureStatus } from "@/shared/api";
import { getHoursFromDate, MATCH_ROUTE } from "@/shared/lib";
import { Box, Flex, Text, useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { FixtureMatchTeam } from "./FixtureMatchTeam";

interface FixtureMatchProps {
  fixtureData: FixtureResponse;
}

export const FixtureMatch: React.FC<FixtureMatchProps> = ({ fixtureData }) => {
  const { teams, fixture, goals } = fixtureData;
  const router = useRouter();
  const { colorMode } = useColorMode();

  let matchDateText = null;

  if (fixture.status.short === FixtureStatus.FT) {
    matchDateText = "Finished";
  } else if (fixture.status.short === FixtureStatus.HT) {
    matchDateText = "Break";
  } else if (fixture.status.elapsed == null) {
    matchDateText = getHoursFromDate(fixture.date);
  } else {
    matchDateText = `${fixture.status.elapsed}'`;
  }

  return (
    <Flex
      onClick={() => router.push(`${MATCH_ROUTE}/${fixture.id}`)}
      alignItems="center"
      gap={2}
      p={2}
      cursor="pointer"
      _hover={{
        transition: "background-color .3s linear",
        backgroundColor: colorMode === "dark" ? "#283941" : "#f4f5f5",
      }}
    >
      <Box flex="0 1 70px" textAlign="center">
        <Text
          color={
            (fixture.status.short !== FixtureStatus.FT &&
              fixture.status.elapsed != null) ||
            fixture.status.short === FixtureStatus.HT
              ? "primary.500"
              : "initial"
          }
          fontSize="sm"
        >
          {matchDateText}
        </Text>
      </Box>
      <Flex flex={"0 1 70%"} flexDir="column" gap={2}>
        <FixtureMatchTeam team={teams.home} goals={goals.home} />
        <FixtureMatchTeam team={teams.away} goals={goals.away} />
      </Flex>
    </Flex>
  );
};
