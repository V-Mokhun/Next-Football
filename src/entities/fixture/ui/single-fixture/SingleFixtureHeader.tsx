import { BasicTeam, FixtureTeam } from "@/shared/api";
import { Box, Flex } from "@chakra-ui/react";
import { useStore } from "effector-react";
import React from "react";
import { fixtureModel } from "../..";
import { SingleFixtureBreadcrumps } from "./SingleFixtureBreadcrumps";
import { SingleFixtureResult } from "./SingleFixtureResult";
import { SingleFixtureTeam } from "./SingleFixtureTeam";

interface SingleFixtureHeaderProps<T extends BasicTeam> {
  FavoriteComponent: React.FC<{ data: T; size: "normal" | "small" }>;
}

export function SingleFixtureHeader({
  FavoriteComponent,
}: SingleFixtureHeaderProps<FixtureTeam>) {
  const singleFixture = useStore(
    fixtureModel.singleFixtureSubmodel.$singleFixture
  );

  if (!singleFixture) return null;

  return (
    <Box>
      <SingleFixtureBreadcrumps singleFixture={singleFixture} />
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
    </Box>
  );
}
