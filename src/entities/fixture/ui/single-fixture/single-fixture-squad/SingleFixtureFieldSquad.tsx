import { LineupTeam } from "@/shared/api";
import { Flex } from "@chakra-ui/react";
import React from "react";
import { TransformedSquad } from "./SingleFixtureField";
import { SingleFixtureFieldPlayer } from "./SingleFixtureFieldPlayer";

interface SingleFixtureFieldSquadProps {
  squad: TransformedSquad;
  colors: LineupTeam["colors"];
  isAway?: boolean;
}

export const SingleFixtureFieldSquad: React.FC<
  SingleFixtureFieldSquadProps
> = ({ squad, colors, isAway = false }) => {
  return (
    <Flex
      flex="0 0 calc(50% - 10px)"
      flexDir={isAway ? "row-reverse" : "row"}
      justifyContent="space-between"
      gap={2}
    >
      {Object.entries(squad).map(([position, players]) => {
        return (
          <Flex
            flexDir={"column"}
            justifyContent="space-around"
            gap={1}
            key={position}
          >
            {players.map((player) => (
              <SingleFixtureFieldPlayer
                colors={colors}
                isGoalkeeper={player.pos === "G"}
                key={player.id}
                player={player}
              />
            ))}
          </Flex>
        );
      })}
    </Flex>
  );
};
