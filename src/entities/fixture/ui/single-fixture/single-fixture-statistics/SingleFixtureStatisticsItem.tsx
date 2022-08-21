import { Statistic } from "@/shared/api";
import { Box, Flex, Progress, Text, useColorMode } from "@chakra-ui/react";
import React from "react";

interface SingleFixtureStatisticsItemProps {
  homeStatistic: Statistic | null;
  awayStatistic: Statistic | null;
}

export const SingleFixtureStatisticsItem: React.FC<
  SingleFixtureStatisticsItemProps
> = ({ homeStatistic, awayStatistic }) => {
  const { colorMode } = useColorMode();
  if (
    !homeStatistic ||
    !awayStatistic ||
    (!homeStatistic.value && !awayStatistic.value)
  )
    return null;

  let homeValue = 0;
  let awayValue = 0;
  let homeBgColor = colorMode === "dark" ? "#eee" : "main.500";
  let awayBgColor = colorMode === "dark" ? "#eee" : "main.500";

  if (typeof homeStatistic.value === "string") {
    homeValue = Number(homeStatistic.value.replace("%", ""));
  }
  if (typeof awayStatistic.value === "string") {
    awayValue = Number(awayStatistic.value.replace("%", ""));
  }

  if (
    typeof homeStatistic.value !== "string" &&
    typeof awayStatistic.value !== "string"
  ) {
    let home = homeStatistic.value ?? 0;
    let away = awayStatistic.value ?? 0;
    let sum = home + away;
    homeValue = Math.floor((home / sum) * 100);
    awayValue = Math.ceil((away / sum) * 100);
  }

  if (homeValue > awayValue) {
    homeBgColor = "primary.500";
  } else if (homeValue < awayValue) {
    awayBgColor = "primary.500";
  }

  return (
    <Box px={{ base: 0, md: 3 }} mb={3}>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        gap={2}
        fontWeight={700}
        mb={1}
        fontSize={{ base: "sm", md: "md" }}
      >
        <Text>{homeStatistic.value ?? 0}</Text>
        <Text>{homeStatistic.type}</Text>
        <Text>{awayStatistic.value ?? 0}</Text>
      </Flex>
      <Flex alignItems="center">
        <Progress
          display="flex"
          justifyContent="flex-end"
          width="50%"
          flex="0 0 50%"
          marginRight="2px"
          borderBottomLeftRadius="2px"
          borderTopLeftRadius="2px"
          value={homeValue}
          bgColor={colorMode === "dark" ? "main.500" : "eee"}
          sx={{
            "> div": {
              backgroundColor: homeBgColor,
              borderBottomLeftRadius: "2px",
              borderTopLeftRadius: "2px",
            },
          }}
        />
        <Progress
          borderBottomRightRadius="2px"
          borderTopRightRadius="2px"
          width="50%"
          flex="0 0 50%"
          value={awayValue}
          bgColor={colorMode === "dark" ? "main.500" : "eee"}
          sx={{
            "> div": {
              backgroundColor: awayBgColor,
              borderBottomRightRadius: "2px",
              borderTopRightRadius: "2px",
            },
          }}
        />
      </Flex>
    </Box>
  );
};
