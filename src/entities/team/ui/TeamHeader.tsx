import { Team } from "@/shared/api";
import {
  MATCHES_ROUTE,
  RESULTS_ROUTE,
  SQUAD_ROUTE,
  STANDINGS_ROUTE,
  TEAM_ROUTE,
} from "@/shared/lib";
import { CardBlock, ChakraImage } from "@/shared/ui";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { useStore } from "effector-react";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { teamModel } from "..";

interface TeamHeaderProps {
  FavoriteComponent: React.FC<{ data: Team; size: "normal" | "small" }>;
}

const LINKS = (id: number) => [
  {
    isActivePath: `${id}`,
    onClickPath: `${TEAM_ROUTE}/${id}`,
    text: "General",
  },
  {
    isActivePath: `${RESULTS_ROUTE}`,
    onClickPath: `${TEAM_ROUTE}/${id}/${RESULTS_ROUTE}`,
    text: "Results",
  },
  {
    isActivePath: `${MATCHES_ROUTE}`,
    onClickPath: `${TEAM_ROUTE}/${id}/${MATCHES_ROUTE}`,
    text: "Matches",
  },
  {
    isActivePath: `${STANDINGS_ROUTE}`,
    onClickPath: `${TEAM_ROUTE}/${id}/${STANDINGS_ROUTE}`,
    text: "Standings",
  },
  {
    isActivePath: `${SQUAD_ROUTE}`,
    onClickPath: `${TEAM_ROUTE}/${id}/${SQUAD_ROUTE}`,
    text: "Squad",
  },
];

export const TeamHeader: React.FC<TeamHeaderProps> = ({
  FavoriteComponent,
}) => {
  const router = useRouter();
  const teamData = useStore(teamModel.$team);

  if (!teamData) return null;

  const { team } = teamData;

  return (
    <CardBlock mb={4}>
      <Head>
        <title>{team.name}</title>
      </Head>
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
        <Flex justifyContent="center" alignItems="center">
          <ChakraImage alt={team.name} src={team.logo} width={84} height={84} />
        </Flex>
        <Box>
          <Flex alignItems="center" gap={{ base: 2, md: 4 }}>
            <Heading as="h1" fontSize={{ base: "xl", md: "2xl" }}>
              {team.name}
            </Heading>
            {<FavoriteComponent size="normal" data={team} />}
          </Flex>
        </Box>
      </Flex>
      <Flex
        overflowX="auto"
        whiteSpace="nowrap"
        alignItems="center"
        mb={2}
        gap={4}
        maxWidth="calc(100vw - 30px)"
        display={{ base: "block", md: "flex" }}
      >
        {LINKS(team.id).map(({ isActivePath, onClickPath, text }) => (
          <Button
            key={text}
            isActive={router.asPath.endsWith(isActivePath)}
            onClick={() => router.push(onClickPath)}
            variant="link"
            mr={{ base: 2, md: 0 }}
            _active={{
              color: "primary.400",
            }}
          >
            {text}
          </Button>
        ))}
      </Flex>
    </CardBlock>
  );
};
