import { Calendar } from "@/entities/calendar";
import { FixtureButtons, fixtureModel } from "@/entities/fixture";
import { NextDayButton, PrevDayButton } from "@/features/change-date";
import { CardBlock } from "@/shared/ui";
import { Matches } from "@/widgets/matches";
import { Flex } from "@chakra-ui/react";
import { useStore } from "effector-react";
import React from "react";

interface HomeProps {}

export const HomePage: React.FC<HomeProps> = ({}) => {
  const isLiveFixturesSelected = useStore(
    fixtureModel.fixturesSubmodel.$isLiveFixtures
  );

  return (
    <CardBlock>
      <Flex justifyContent="space-between" gap={{ base: 4, md: 2 }} mb={4}>
        <FixtureButtons />
        {isLiveFixturesSelected ? null : (
          <Calendar
            NextButton={<NextDayButton />}
            PrevButton={<PrevDayButton />}
          />
        )}
      </Flex>
      <Matches />
    </CardBlock>
  );
};
