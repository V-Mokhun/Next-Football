import { FixtureResponse, FixtureStatus } from "@/shared/api";
import { convertToReadableDate, FIXTURE_ROUTE } from "@/shared/lib";
import { ChakraImage } from "@/shared/ui";
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
  showLeague?: boolean;
  hoursOnlyDate?: boolean;
  dateText?: string;
}

export const FixtureMatch: React.FC<FixtureMatchProps> = ({
  fixtureData,
  hoursOnlyDate = true,
  dateText,
  showLeague = false,
}) => {
  const { colorMode } = useColorMode();

  if (!fixtureData) {
    return <Skeleton width="100%" />;
  }

  const { teams, fixture, goals, league } = fixtureData;

  let matchDateText: string | null = null;
  let leagueName: string = "";

  if (showLeague) {
    leagueName = league.name
      .toUpperCase()
      .split(" ")
      .map((word) => word[0])
      .join("");
  }

  if (dateText) {
    matchDateText = dateText;
  } else if (fixture.status.short === FixtureStatus.FT) {
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
          <Flex
            flex={{
              base: "0 1 60px",
              sm: showLeague ? "0 1 auto" : "0 0 75px",
            }}
            flexDir={{ base: "column", sm: "row" }}
            alignItems="center"
            gap={2}
          >
            <Box flex="0 1 auto" textAlign="center">
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
            {showLeague && (
              <Flex
                alignItems="center"
                justifyContent="center"
                flex="0 1 auto"
                textAlign="center"
                gap={2}
              >
                {(league.flag || league.logo) && (
                  <Box flex="0 0 18px">
                    <ChakraImage
                      src={league.flag || league.logo}
                      alt={league.name}
                      width={18}
                      height={12}
                    />
                  </Box>
                )}
                <Text>{leagueName}</Text>
              </Flex>
            )}
          </Flex>

          <Flex flex={"0 1 70%"} flexDir="column" gap={2}>
            <FixtureMatchTeam team={teams.home} goals={goals.home} />
            <FixtureMatchTeam team={teams.away} goals={goals.away} />
          </Flex>
        </Flex>
      </Link>
    </NextLink>
  );
};
