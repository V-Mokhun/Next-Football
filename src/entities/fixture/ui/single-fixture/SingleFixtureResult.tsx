import { Fixture, FixtureStatus, SingleFixtureResponse } from "@/shared/api";
import { convertToReadableDate } from "@/shared/lib";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

interface SingleFixtureResultProps {
  status: Fixture["status"];
  date: Fixture["date"];
  goals: SingleFixtureResponse["goals"];
}

export const SingleFixtureResult: React.FC<SingleFixtureResultProps> = ({
  status,
  date,
  goals,
}) => {
  let matchStatusText: string | null = null;
  if (status.short === FixtureStatus.FT) {
    matchStatusText = "Finished";
  } else if (status.short === FixtureStatus.HT) {
    matchStatusText = "Break";
  } else {
    matchStatusText = `${status.elapsed}'`;
  }
  return (
    <Box textAlign="center">
      <Box mb={2}>
        <Text>{convertToReadableDate(date)}</Text>
      </Box>
      <Box mb={2}>
        <Text fontSize="4xl" fontWeight="700">
          {goals.home} - {goals.away}
        </Text>
      </Box>
      <Box>
        <Text
          textTransform="uppercase"
          fontWeight="700"
          fontSize="lg"
          color={
            (status.short !== FixtureStatus.FT && status.elapsed != null) ||
            status.short === FixtureStatus.HT
              ? "primary.500"
              : "initial"
          }
        >
          {matchStatusText}
        </Text>
      </Box>
    </Box>
  );
};
