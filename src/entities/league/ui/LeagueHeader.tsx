import { League } from "@/shared/api";
import { Box, Flex, Heading, Img, Text } from "@chakra-ui/react";
import { useStore } from "effector-react";
import React from "react";
import { leagueModel } from "..";

interface LeagueHeaderProps {
  FavoriteComponent: React.FC<{ data: League; size: "normal" | "small" }>;
}

export const LeagueHeader: React.FC<LeagueHeaderProps> = ({
  FavoriteComponent,
}) => {
  const leagueData = useStore(leagueModel.$league);

  if (!leagueData) {
    return null;
  }
  const { league, country, seasons } = leagueData;
  const [season] = seasons;

  return (
    <Box borderRadius="8px" p="12px" backgroundColor="main.500">
      <Flex mb={4} alignItems="center" gap={2}>
        <Box>
          <Img w={18} h={12} alt={country.name} src={country.flag} />
        </Box>
        <Text textTransform="uppercase" fontSize="sm" fontWeight={700}>
          {country.name}
        </Text>
      </Flex>
      <Flex alignItems="center" gap={4}>
        <Box>
          <Img
            alt={league.name}
            src={league.logo || country.flag}
            w={84}
            h={84}
          />
        </Box>
        <Box>
          <Flex alignItems="center" gap={4} mb={3}>
            <Heading as="h1" fontSize="2xl">
              {league.name}
            </Heading>
            {<FavoriteComponent size="normal" data={league} />}
          </Flex>
          <Text fontWeight={700} fontSize="sm">{`${season.start.slice(
            0,
            4
          )}/${season.end.slice(0, 4)}`}</Text>
        </Box>
      </Flex>
    </Box>
  );
};
