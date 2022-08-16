import { SingleFixtureResponse } from "@/shared/api";
import { LEAGUE_ROUTE } from "@/shared/lib";
import { ChakraImage } from "@/shared/ui";
import { Flex, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

interface SingleFixtureBreadcrumpsProps {
  league: SingleFixtureResponse["league"];
}

export const SingleFixtureBreadcrumps: React.FC<
  SingleFixtureBreadcrumpsProps
> = ({ league }) => {
  return (
    <Flex
      borderBottomColor="main.400"
      borderBottomWidth={1}
      borderBottomStyle="solid"
      alignItems="center"
      gap={1}
      p={2}
    >
      <Flex justifyContent="center" alignItems="center">
        <ChakraImage
          width={18}
          height={12}
          src={league.flag || league.logo}
          alt={league.name}
        />
      </Flex>
      <Text>
        {league.country}:{" "}
        <NextLink href={`${LEAGUE_ROUTE}/${league.id}`} passHref>
          <Link>
            {league.name} - {league.round}
          </Link>
        </NextLink>
      </Text>
    </Flex>
  );
};
