import { BasicTeam, FixtureTeam } from "@/shared/api";
import { TEAM_ROUTE } from "@/shared/lib";
import { ChakraImage } from "@/shared/ui";
import { Box, Flex, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

interface SingleFixtureTeamProps<T extends BasicTeam> {
  FavoriteComponent: React.FC<{ data: T; size: "normal" | "small" }>;
  team: FixtureTeam;
  isAway?: boolean;
}

export function SingleFixtureTeam({
  FavoriteComponent,
  team,
  isAway = false,
}: SingleFixtureTeamProps<FixtureTeam>) {
  return (
    <Flex
      gap={4}
      alignItems="center"
      flexDirection={isAway ? "row-reverse" : "row"}
    >
      {<FavoriteComponent size="normal" data={team} />}
      <NextLink href={`${TEAM_ROUTE}/${team.id}`} passHref>
        <Link width="100%">
          <Box textAlign="center" mb={1}>
            <ChakraImage
              src={team.logo}
              alt={team.name}
              width={84}
              height={84}
              borderRadius="12px"
            />
          </Box>
          <Text
            fontWeight={team.winner ? 700 : 400}
            textAlign="center"
            fontSize="lg"
          >
            {team.name}
          </Text>
        </Link>
      </NextLink>
    </Flex>
  );
}
