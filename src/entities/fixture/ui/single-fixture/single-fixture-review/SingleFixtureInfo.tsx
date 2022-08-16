import { fixtureModel } from "@/entities/fixture";
import { Box, Flex, Text, useColorMode } from "@chakra-ui/react";
import { useStoreMap } from "effector-react";
import React from "react";

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
            venue: fixture.fixture.venue.name,
          }
        : {},
  });

  return (
    <Box mb={2}>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        gap={2}
        backgroundColor="main.400"
        py={1}
        px={3}
        borderRadius="8px"
        fontSize="md"
        mb={3}
      >
        Match information
      </Flex>
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
        {referee && (
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
              {venue}
            </Text>
          </Flex>
        )}
      </Box>
    </Box>
  );
};
