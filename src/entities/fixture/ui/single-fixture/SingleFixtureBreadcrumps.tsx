import { SingleFixtureResponse } from "@/shared/api";
import { LEAGUE_ROUTE } from "@/shared/lib";
import { ChakraImage } from "@/shared/ui";
import { Box, Flex, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

interface SingleFixtureBreadcrumpsProps {
  singleFixture: SingleFixtureResponse;
}

export const SingleFixtureBreadcrumps: React.FC<
  SingleFixtureBreadcrumpsProps
> = ({ singleFixture }) => {
  return (
    <Flex
      borderBottomColor="main.400"
      borderBottomWidth={1}
      borderBottomStyle="solid"
      alignItems="center"
      gap={1}
      p={2}
    >
      <Box>
        <ChakraImage
          width={18}
          height={12}
          src={singleFixture.league.flag || singleFixture.league.logo}
          alt={singleFixture.league.name}
        />
      </Box>
      <Text>
        {singleFixture.league.country}:{" "}
        <NextLink href={`${LEAGUE_ROUTE}/${singleFixture.league.id}`} passHref>
          <Link>
            {singleFixture.league.name} - {singleFixture.league.round}
          </Link>
        </NextLink>
      </Text>
    </Flex>
  );
};
