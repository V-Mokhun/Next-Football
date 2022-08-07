import { Player, PlayerPosition } from "@/shared/api";
import { AlertMessage, CardBlock } from "@/shared/ui";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import { useStore, useStoreMap } from "effector-react";
import React from "react";
import { teamModel } from "..";
import { TeamSquadPosition } from "./TeamSquadPosition";

interface TeamSquadProps {}

type PlayersByPosition = {
  [K in PlayerPosition]: Player[];
};

export const TeamSquad: React.FC<TeamSquadProps> = ({}) => {
  const players = useStoreMap(teamModel.$teamSquad, (teamSquad) => {
    if (!teamSquad) return null;

    const playersByPosition: PlayersByPosition = {
      Goalkeeper: [],
      Defender: [],
      Midfielder: [],
      Attacker: [],
    };

    teamSquad.players.forEach((player) => {
      const { position } = player;
      playersByPosition[position].push(player);
    });

    return playersByPosition;
  });
  const loading = useStore(teamModel.$teamSquadLoading);
  const error = useStore(teamModel.$teamSquadError);

  let body = null;

  if (error) {
    body = <AlertMessage error={error} />;
  } else if (loading) {
    body = (
      <Flex justifyContent="center" mb={2}>
        <Spinner size="xl" />
      </Flex>
    );
  } else if (!players) {
    body = (
      <CardBlock>
        <Text>No squad found</Text>
      </CardBlock>
    );
  } else {
    body = (
      <CardBlock>
        {Object.entries(players).map(([position, playersByPosition]) => (
          <TeamSquadPosition
            key={position}
            players={playersByPosition}
            position={position as PlayerPosition}
          />
        ))}
      </CardBlock>
    );
  }

  return body;
};
