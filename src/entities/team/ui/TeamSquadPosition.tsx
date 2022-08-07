import { Player, PlayerPosition } from "@/shared/api";
import { Box, Heading, Table, TableContainer, Tbody } from "@chakra-ui/react";
import React from "react";
import { TeamSquadHeader } from "./TeamSquadHeader";
import { TeamSquadPlayer } from "./TeamSquadPlayer";

interface TeamSquadPositionProps {
  position: PlayerPosition;
  players: Player[];
}

export const TeamSquadPosition: React.FC<TeamSquadPositionProps> = ({
  players,
  position,
}) => {
  return (
    <Box mb={2}>
      <Heading as="h2" fontSize="xl" mb={4}>
        {position}
      </Heading>
      <TableContainer mb={4}>
        <Table variant="simple">
          <TeamSquadHeader />
          <Tbody>
            {players.map((player, index) => (
              <TeamSquadPlayer
                key={player.id}
                player={player}
                isEven={(index + 1) % 2 === 0}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};
