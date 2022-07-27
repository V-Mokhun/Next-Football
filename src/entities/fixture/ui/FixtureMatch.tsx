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
      }}>
      <Box flex="0 1 70px" textAlign="center">
        <Text fontSize="sm">
          {fixture.status.short === FixtureStatus.FT
            ? "Finished"
            : fixture.status.elapsed == null
            ? getHoursFromDate(fixture.date)
            : `'${fixture.status.elapsed}`}
        </Text>
      </Box>
      <Flex flex={"0 1 70%"} flexDir="column" gap={2}>
        <FixtureMatchTeam team={teams.home} goals={goals.home} />
        <FixtureMatchTeam team={teams.away} goals={goals.away} />
      </Flex>
    </Flex>
  );
};
