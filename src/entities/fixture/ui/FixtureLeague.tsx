import { FixtureResponse, League } from "@/shared/api";
import { LEAGUE_ROUTE } from "@/shared/lib";
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Image,
  Link,
  Text
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

interface FixtureLeagueProps {
  league: FixtureResponse["league"];
  FavoriteComponent: React.FC<{
    data: League;
    size: "normal" | "small";
  }> | null;
  matches: React.ReactElement | React.ReactElement[];
  isFavorite: boolean;
  matchesQuantity: number;
}

export const FixtureLeague: React.FC<FixtureLeagueProps> = ({
  FavoriteComponent,
  league,
  matches,
  isFavorite,
  matchesQuantity,
}) => {
  return (
    <AccordionItem>
      {({ isExpanded }) => (
        <>
          <Flex alignItems="center" gap={2}>
            {FavoriteComponent && (
              <FavoriteComponent size="small" data={league} />
            )}
            <Flex alignItems="center" flex="1 1 100%" textAlign="left">
              <Box mr={2}>
                <Image alt={league.name} src={league.flag || league.logo} w="18px" h="12px" />
              </Box>
              <Text
                color={isFavorite ? "yellow.400" : "initial"}
                mr={1}
                fontSize="md">
                {league.country}:
              </Text>
              <NextLink href={`${LEAGUE_ROUTE}/${league.id}`} passHref>
                <Link
                  color={isFavorite ? "yellow.400" : "initial"}
                  fontSize="md">
                  {league.name}
                </Link>
              </NextLink>
            </Flex>
            <AccordionButton
              justifyContent="flex-end"
              width="auto"
              flex="0 1 auto">
              {!isExpanded && (
                <Text whiteSpace="nowrap" fontSize="xs">
                  Show matches ({matchesQuantity})
                </Text>
              )}
              <AccordionIcon />
            </AccordionButton>
          </Flex>
          <AccordionPanel p={0}>{matches}</AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
};
