import { fixtureModel } from "@/entities/fixture";
import { Box, Flex, Text, useColorMode } from "@chakra-ui/react";
import { useStoreMap } from "effector-react";
import React from "react";
import { SingleFixtureTitle } from "../SingleFixtureTitle";

interface SingleFixtureInfoProps {}

export const SingleFixtureInfo: React.FC<SingleFixtureInfoProps> = ({}) => {
  const { colorMode } = useColorMode();
  const { referee, venue } = useStoreMap({
    store: fixtureModel.singleFixtureSubmodel.$singleFixture,
    keys: [],
    fn: (fixture) =>
      fixture
        ? {
            referee: fixture.fixture.referee,
            venue: fixture.fixture.venue,
          }
        : {},
  });

  return (
    <Box mb={2}>
      <SingleFixtureTitle mb={3}>Match information</SingleFixtureTitle>
      <Box>
        {referee && (
          <Flex
            alignItems="center"
            justifyContent="space-between"
            gap={2}
            px={4}
            mb={2}
          >
            <Text>Referee:</Text>
            <Text
              fontWeight={700}
              color={colorMode === "dark" ? "white" : "initial"}
            >
              {referee}
            </Text>
          </Flex>
        )}
        {venue && (
          <Flex
            alignItems="center"
            justifyContent="space-between"
            gap={2}
            px={4}
          >
            <Text>Venue:</Text>
            <Text
              fontWeight={700}
              color={colorMode === "dark" ? "white" : "initial"}
            >
              {venue.name} ({venue.city})
            </Text>
          </Flex>
        )}
      </Box>
    </Box>
  );
};
