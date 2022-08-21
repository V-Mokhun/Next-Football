import { League } from "@/shared/api";
import { LEAGUE_ROUTE, MATCHES_ROUTE, STANDINGS_ROUTE } from "@/shared/lib";
import { CardBlock, ChakraImage } from "@/shared/ui";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useStore } from "effector-react";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { leagueModel } from "..";

interface LeagueHeaderProps {
  FavoriteComponent: React.FC<{ data: League; size: "normal" | "small" }>;
}

const LINKS = (id: number) => [
  {
    isActivePath: `${id}`,
    onClickPath: `${LEAGUE_ROUTE}/${id}`,
    isStandings: false,
    text: "General",
  },
  {
    isActivePath: `${MATCHES_ROUTE}`,
    onClickPath: `${LEAGUE_ROUTE}/${id}/${MATCHES_ROUTE}`,
    isStandings: false,
    text: "Matches",
  },
  {
    isActivePath: `${STANDINGS_ROUTE}`,
    onClickPath: `${LEAGUE_ROUTE}/${id}/${STANDINGS_ROUTE}`,
    isStandings: true,
    text: "Standings",
  },
];

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
    <CardBlock mb={4}>
      <Head>
        <title>{league.name}</title>
      </Head>
      {country.flag && (
        <Flex mb={4} alignItems="center" gap={2}>
          <Box>
            <ChakraImage
              width={18}
              height={12}
              alt={country.name}
              src={country.flag}
            />
          </Box>
          <Text textTransform="uppercase" fontSize="sm" fontWeight={700}>
            {country.name}
          </Text>
        </Flex>
      )}
      <Flex
        borderBottomWidth={1}
        borderBottomStyle="solid"
        borderBottomColor="main.400"
        alignItems="center"
        pb={4}
        mb={4}
        gap={{ base: 2, md: 4 }}
        flexDir={{ base: "column", md: "row" }}
      >
        {(league.logo || country.flag) && (
          <Flex justifyContent="center" alignItems="center">
            <ChakraImage
              alt={league.name}
              src={league.logo || country.flag}
              width={84}
              height={84}
            />
          </Flex>
        )}
        <Box>
          <Flex
            alignItems="center"
            gap={{ base: 2, md: 4 }}
            mb={{ base: 1, md: 3 }}
          >
            <Heading as="h1" fontSize={{ base: "xl", md: "2xl" }}>
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
        {LINKS(league.id).map(
          ({ isActivePath, onClickPath, text, isStandings }) => {
            if (isStandings && !season.coverage.standings) return null;

            return (
              <Button
                key={text}
                isActive={router.asPath.endsWith(isActivePath)}
                onClick={() => router.push(onClickPath)}
                variant="link"
                _active={{
                  color: "primary.400",
                }}
              >
                {text}
              </Button>
            );
          }
        )}
      </Flex>
    </CardBlock>
  );
};
