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
          <ChakraImage alt={team.name} src={team.logo} w={84} h={84} />
        </Box>
        <Box>
          <Flex alignItems="center" gap={4}>
            <Heading as="h1" fontSize="2xl">
              {team.name}
            </Heading>
            {<FavoriteComponent size="normal" data={team} />}
          </Flex>
        </Box>
      </Flex>
      <Flex alignItems="center" mb={2} gap={4}>
        {LINKS(team.id).map(({ isActivePath, onClickPath, text }) => (
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
        ))}
      </Flex>
    </CardBlock>
  );
};
