import { FixtureResponse, League } from "@/shared/api";
import { LEAGUE_ROUTE } from "@/shared/lib";
import { ChakraImage } from "@/shared/ui";
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Hide,
  Link,
  Text,
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
  isAccordion?: boolean;
}

export const FixtureLeague: React.FC<FixtureLeagueProps> = ({
  FavoriteComponent,
  league,
  matches,
  isFavorite,
  matchesQuantity,
  isAccordion = true,
}) => {
  let body = null;

  if (isAccordion) {
    body = (
      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <Flex alignItems="center" gap={2} py={{ base: 1, md: 0 }}>
              {FavoriteComponent && (
                <FavoriteComponent size="small" data={league} />
              )}
              <Flex
                fontWeight={700}
                alignItems="center"
                flex="1 1 100%"
                textAlign="left"
                fontSize="sm"
              >
                <Flex justifyContent="center" alignItems="center" mr={2}>
                  <ChakraImage
                    alt={league.name}
                    src={league.flag || league.logo}
                    width={18}
                    height={12}
                  />
                </Flex>
                <Flex flexDir={{ base: "column-reverse", md: "row" }}>
                  <Text
                    color={isFavorite ? "yellow.400" : "initial"}
                    mr={1}
                    textTransform="uppercase"
                    fontWeight={{ base: 400, md: 700 }}
                    fontSize={{ base: "xs", md: "sm" }}
                  >
                    {league.country}
                  </Text>
                  <NextLink href={`${LEAGUE_ROUTE}/${league.id}`} passHref>
                    <Link color={isFavorite ? "yellow.400" : "initial"}>
                      {league.name}
                    </Link>
                  </NextLink>
                </Flex>
              </Flex>
              <AccordionButton
                justifyContent="flex-end"
                width="auto"
                flex="0 1 auto"
              >
                {!isExpanded && (
                  <Hide below="md">
                    <Text whiteSpace="nowrap" fontSize="xs">
                      Show matches ({matchesQuantity})
                    </Text>
                  </Hide>
                )}
                <AccordionIcon />
              </AccordionButton>
            </Flex>
            <AccordionPanel p={0}>{matches}</AccordionPanel>
          </>
        )}
      </AccordionItem>
    );
  } else {
    body = (
      <Box mb={2}>
        <Flex alignItems="center" gap={2}>
          {FavoriteComponent && (
            <FavoriteComponent size="small" data={league} />
          )}
          <Flex
            fontWeight={700}
            alignItems="center"
            flex="1 1 100%"
            textAlign="left"
            fontSize="sm"
          >
            <Flex justifyContent="center" alignItems="center" mr={2}>
              <ChakraImage
                alt={league.name}
                src={league.flag || league.logo}
                width={18}
                height={12}
              />
            </Flex>
            <Text
              color={isFavorite ? "yellow.400" : "initial"}
              mr={1}
              textTransform="uppercase"
            >
              {league.country}:
            </Text>
            <NextLink href={`${LEAGUE_ROUTE}/${league.id}`} passHref>
              <Link color={isFavorite ? "yellow.400" : "initial"}>
                {league.name}
              </Link>
            </NextLink>
          </Flex>
        </Flex>
        <Box>{matches}</Box>
      </Box>
    );
  }

  return body;
};
