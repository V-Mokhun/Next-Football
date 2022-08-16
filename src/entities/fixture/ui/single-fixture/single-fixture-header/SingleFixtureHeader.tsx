import { fixtureModel } from "@/entities/fixture";
import { BasicTeam, FixtureTeam } from "@/shared/api";
import { Box, Flex } from "@chakra-ui/react";
import { useStore } from "effector-react";
import Head from "next/head";
import React from "react";
import { SingleFixtureBreadcrumps } from "./SingleFixtureBreadcrumps";
import { SingleFixtureLinks } from "./SingleFixtureLinks";
import { SingleFixtureResult } from "./SingleFixtureResult";
import { SingleFixtureTeam } from "./SingleFixtureTeam";

interface SingleFixtureHeaderProps<T extends BasicTeam> {
  FavoriteComponent: React.FC<{ data: T; size: "normal" | "small" }> | null;
}

export function SingleFixtureHeader({
  FavoriteComponent,
}: SingleFixtureHeaderProps<FixtureTeam>) {
  const singleFixture = useStore(
    fixtureModel.singleFixtureSubmodel.$singleFixture
  );

  if (!singleFixture) return null;

  return (
    <Box mb={4}>
      <Head>
        <title>
          {`${singleFixture.teams.home.name} ${
            singleFixture.goals.home ?? 0
          } - ${singleFixture.goals.away ?? 0} ${
            singleFixture.teams.away.name
          }`}
        </title>
      </Head>
      <SingleFixtureBreadcrumps league={singleFixture.league} />
      <Flex
        borderBottomColor="main.400"
        borderBottomWidth={1}
        borderBottomStyle="solid"
        alignItems="center"
        justifyContent="space-between"
        gap={8}
        py={3}
        px={2}
      >
        <SingleFixtureTeam
          FavoriteComponent={FavoriteComponent}
          team={singleFixture.teams.home}
        />
        <SingleFixtureResult
          date={singleFixture.fixture.date}
          status={singleFixture.fixture.status}
          goals={singleFixture.goals}
        />
        <SingleFixtureTeam
          FavoriteComponent={FavoriteComponent}
          team={singleFixture.teams.away}
          isAway={true}
        />
      </Flex>
      <SingleFixtureLinks
        isSquadEmpty={singleFixture.lineups.length < 1}
        isStatisticsEmpty={singleFixture.statistics.length < 1}
        id={singleFixture.fixture.id}
      />
    </Box>
  );
}
