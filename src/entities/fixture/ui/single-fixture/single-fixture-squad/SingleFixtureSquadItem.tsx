import { LineupStart } from "@/shared/api";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { SingleFixtureTitle } from "../SingleFixtureTitle";
import { SingleFixturePlayer } from "./SingleFixturePlayer";

interface SingleFixtureSquadItemProps {
  homeSquad: LineupStart<string | null>[];
  awaySquad: LineupStart<string | null>[];
  title: string;
}

export const SingleFixtureSquadItem: React.FC<SingleFixtureSquadItemProps> = ({
  homeSquad,
  awaySquad,
  title,
}) => {
  return (
    <Box mb={4}>
      <SingleFixtureTitle justifyContent="center">{title}</SingleFixtureTitle>
      <Flex justifyContent="space-between">
        <Box flex="1 1 auto">
          {homeSquad.map(({ player }, index) => (
            <SingleFixturePlayer
              key={player.id}
              player={player}
              isOdd={index % 2 === 1}
            />
          ))}
        </Box>
        <Box textAlign="right" flex="1 1 auto">
          {awaySquad.map(({ player }, index) => (
            <SingleFixturePlayer
              isAway={true}
              key={player.id}
              player={player}
              isOdd={index % 2 === 1}
            />
          ))}
        </Box>
      </Flex>
    </Box>
  );
};
