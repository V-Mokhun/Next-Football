import { fixtureModel } from "@/entities/fixture";
import { ChakraImage } from "@/shared/ui";
import { Box, Flex, Hide, Text } from "@chakra-ui/react";
import { useStoreMap } from "effector-react";
import { SingleFixtureTitle } from "../SingleFixtureTitle";
import { SingleFixtureField } from "./SingleFixtureField";
import { SingleFixtureSquadItem } from "./SingleFixtureSquadItem";

export const SingleFixtureSquad = ({}) => {
  const squad = useStoreMap({
    store: fixtureModel.singleFixtureSubmodel.$singleFixture,
    keys: [],
    fn: (fixture) => (fixture ? fixture.lineups : []),
  });

  if (squad.length === 0) return <Text>No squads found.</Text>;

  const [homeTeam, awayTeam] = squad;

  return (
    <>
      {homeTeam.formation && (
        <Hide below="md">
          <SingleFixtureField
            awayTeamFormation={awayTeam.formation}
            homeTeamFormation={homeTeam.formation}
            awayTeamSquad={awayTeam.startXI}
            homeTeamSquad={homeTeam.startXI}
            homeTeamColors={homeTeam.team.colors}
            awayTeamColors={awayTeam.team.colors}
          />
        </Hide>
      )}
      <SingleFixtureSquadItem
        homeSquad={homeTeam.startXI}
        awaySquad={awayTeam.startXI}
        title="Starting squad"
      />
      <SingleFixtureSquadItem
        homeSquad={homeTeam.substitutes}
        awaySquad={awayTeam.substitutes}
        title="Substitutes"
      />
      <Box>
        <SingleFixtureTitle justifyContent="center">Coaches</SingleFixtureTitle>
        <Flex justifyContent="space-between">
          <Flex alignItems="center" gap={1} flex="1 1 auto" py={1} px={3}>
            <Box mr={2}>
              <ChakraImage
                src={homeTeam.coach.photo}
                alt={homeTeam.coach.name}
                width={50}
                height={50}
                borderRadius="8px"
              />
            </Box>
            <Text>{homeTeam.coach.name}</Text>
          </Flex>
          <Flex
            alignItems="center"
            gap={1}
            justifyContent="flex-end"
            flex="1 1 auto"
            py={1}
            px={3}
          >
            <Text>{awayTeam.coach.name}</Text>
            <Box ml={2}>
              <ChakraImage
                src={awayTeam.coach.photo}
                alt={awayTeam.coach.name}
                width={50}
                height={50}
                borderRadius="8px"
              />
            </Box>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};
