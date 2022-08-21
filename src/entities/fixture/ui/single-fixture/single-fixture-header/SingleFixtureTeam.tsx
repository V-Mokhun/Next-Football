import { BasicTeam, FixtureTeam } from "@/shared/api";
import { TEAM_ROUTE } from "@/shared/lib";
import { ChakraImage } from "@/shared/ui";
import { Box, Flex, Hide, Link, Text, useMediaQuery } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

interface SingleFixtureTeamProps<T extends BasicTeam> {
  FavoriteComponent: React.FC<{ data: T; size: "normal" | "small" }> | null;
  team: FixtureTeam;
  isAway?: boolean;
}

export function SingleFixtureTeam({
  FavoriteComponent,
  team,
  isAway = false,
}: SingleFixtureTeamProps<FixtureTeam>) {
  const [isLargetThan768] = useMediaQuery("(min-width: 768px)");

  return (
    <Flex
      gap={{ base: 2, md: 4 }}
      alignItems="center"
      flexDirection={isAway ? "row-reverse" : "row"}
    >
      {FavoriteComponent && (
        <Hide below="md">
          <FavoriteComponent
            size={isLargetThan768 ? "normal" : "small"}
            data={team}
          />
        </Hide>
      )}
      <Box>
        <Flex
          gap={2}
          alignItems="center"
          textAlign="center"
          flexDirection={isAway ? "row-reverse" : "row"}
          mb={{ base: 0, md: 1 }}
        >
          {FavoriteComponent && (
            <Hide above="md">
              <FavoriteComponent
                size={isLargetThan768 ? "normal" : "small"}
                data={team}
              />
            </Hide>
          )}
          <NextLink href={`${TEAM_ROUTE}/${team.id}`} passHref>
            <Link
              flex={`0 0 ${isLargetThan768 ? 84 : 52}px`}
              isExternal
              width="100%"
            >
              <ChakraImage
                src={team.logo}
                alt={team.name}
                width={isLargetThan768 ? 84 : 52}
                height={isLargetThan768 ? 84 : 52}
                borderRadius="12px"
              />
            </Link>
          </NextLink>
        </Flex>
        <NextLink href={`${TEAM_ROUTE}/${team.id}`} passHref>
          <Link isExternal width="100%">
            <Text
              fontWeight={team.winner ? 700 : 400}
              textAlign="center"
              fontSize={{ base: "sm", sm: "md", md: "lg" }}
            >
              {team.name}
            </Text>
          </Link>
        </NextLink>
      </Box>
    </Flex>
  );
}
