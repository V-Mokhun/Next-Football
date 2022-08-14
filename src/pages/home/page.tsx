import { Calendar } from "@/entities/calendar";
import { FixtureButtons, fixtureModel } from "@/entities/fixture";
import { NextDayButton, PrevDayButton } from "@/features/change-date";
import { Matches } from "@/widgets/matches";
import { Box, Flex } from "@chakra-ui/react";
import { useStore } from "effector-react";
import React from "react";

interface HomeProps {}

export const HomePage: React.FC<HomeProps> = ({}) => {
  const isLiveFixturesSelected = useStore(
    fixtureModel.fixturesSubmodel.$isLiveFixtures
  );

  return (
    <Box
      borderRadius="8px"
      pt="16px"
      pb="4px"
      px="12px"
      backgroundColor="main.500"
    >
      <Flex justifyContent="space-between" gap={2} mb={4}>
        <FixtureButtons />
        {isLiveFixturesSelected ? null : (
          <Calendar
            NextButton={<NextDayButton />}
            PrevButton={<PrevDayButton />}
          />
        )}
      </Flex>
      <Matches />
    </Box>
  );
};
