import { FixtureResponse, FixtureStatus } from "@/shared/api";
import { convertToReadableDate, FIXTURE_ROUTE } from "@/shared/lib";
import {
  Box,
  Flex,
  Link,
  Skeleton,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { FixtureMatchTeam } from "./FixtureMatchTeam";

interface FixtureMatchProps {
  fixtureData: FixtureResponse | null;
  hoursOnlyDate?: boolean;
}

export const FixtureMatch: React.FC<FixtureMatchProps> = ({
  fixtureData,
  hoursOnlyDate = true,
}) => {
  const { colorMode } = useColorMode();

  if (!fixtureData) {
    return <Skeleton width="100%" />;
  }

  const { teams, fixture, goals } = fixtureData;

  let matchDateText: string | null = null;

  if (fixture.status.short === FixtureStatus.FT) {
    matchDateText = "Finished";
  } else if (fixture.status.short === FixtureStatus.HT) {
    matchDateText = "Break";
  } else if (fixture.status.elapsed == null) {
    matchDateText = convertToReadableDate(fixture.date, hoursOnlyDate);
  } else {
    matchDateText = `${fixture.status.elapsed}'`;
  }

  return (
    <NextLink href={`${FIXTURE_ROUTE}/${fixture.id}`} passHref>
      <Link width="100%" isExternal _hover={{ textDecor: "initial" }}>
        <Flex
          alignItems="center"
          gap={2}
          p={2}
          borderBottomWidth={1}
          borderBottomStyle="solid"
          borderBottomColor="main.400"
          cursor="pointer"
          _hover={{
            transition: "background-color .3s linear",
            backgroundColor: colorMode === "dark" ? "#283941" : "#f4f5f5",
          }}
        >
          <Box flex="0 1 75px" textAlign="center">
            <Text
              color={
                (fixture.status.short !== FixtureStatus.FT &&
                  fixture.status.elapsed != null) ||
                fixture.status.short === FixtureStatus.HT
                  ? "primary.500"
                  : "initial"
              }
              fontSize="xs"
            >
              {matchDateText}
            </Text>
          </Box>
          <Flex flex={"0 1 70%"} flexDir="column" gap={2}>
            <FixtureMatchTeam team={teams.home} goals={goals.home} />
            <FixtureMatchTeam team={teams.away} goals={goals.away} />
          </Flex>
        </Flex>
      </Link>
    </NextLink>
  );
};
