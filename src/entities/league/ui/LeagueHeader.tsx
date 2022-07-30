import { League } from "@/shared/api";
import {
  LEAGUE_MATCHES_ROUTE,
  LEAGUE_ROUTE,
  LEAGUE_STANDINGS_ROUTE,
} from "@/shared/lib";
import { Box, Button, Flex, Heading, Img, Text } from "@chakra-ui/react";
import { useStore } from "effector-react";
import { useRouter } from "next/router";
import React from "react";
import { leagueModel } from "..";

interface LeagueHeaderProps {
  FavoriteComponent: React.FC<{ data: League; size: "normal" | "small" }>;
}

export const LeagueHeader: React.FC<LeagueHeaderProps> = ({
  FavoriteComponent,
}) => {
  const leagueData = useStore(leagueModel.$league);
  const router = useRouter();

  if (!leagueData) {
    return null;
  }
  const { league, country, seasons } = leagueData;
  const [season] = seasons;

  return (
    <Box mb={4} borderRadius="8px" p="12px" backgroundColor="main.500">
      <Flex mb={4} alignItems="center" gap={2}>
        <Box>
          <Img w={18} h={12} alt={country.name} src={country.flag} />
        </Box>
        <Text textTransform="uppercase" fontSize="sm" fontWeight={700}>
          {country.name}
        </Text>
      </Flex>
      <Flex
        borderBottomWidth={1}
        borderBottomStyle="solid"
        borderBottomColor="main.400"
        alignItems="center"
        pb={4}
        mb={4}
        gap={4}
      >
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
      <Flex alignItems="center" mb={2} gap={4}>
        <Button
          isActive={router.asPath.endsWith(String(league.id))}
          onClick={() => router.push(`${LEAGUE_ROUTE}/${league.id}`)}
          variant="link"
          _active={{
            color: "primary.400",
          }}
        >
          General
        </Button>
        <Button
          onClick={() =>
            router.push(`${LEAGUE_ROUTE}/${league.id}/${LEAGUE_MATCHES_ROUTE}`)
          }
          isActive={router.asPath.endsWith(LEAGUE_MATCHES_ROUTE)}
          variant="link"
          _active={{
            color: "primary.400",
          }}
        >
          Matches
        </Button>
        <Button
          onClick={() =>
            router.push(
              `${LEAGUE_ROUTE}/${league.id}/${LEAGUE_STANDINGS_ROUTE}`
            )
          }
          isActive={router.asPath.endsWith(LEAGUE_STANDINGS_ROUTE)}
          variant="link"
          _active={{
            color: "primary.400",
          }}
        >
          Standings
        </Button>
      </Flex>
    </Box>
  );
};
