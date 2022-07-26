import { FixtureTeam } from "@/shared/api";
import { Box, Flex, Img, Text } from "@chakra-ui/react";
import React from "react";

interface FixtureMatchTeamProps {
  team: FixtureTeam;
  goals: number | null;
}

export const FixtureMatchTeam: React.FC<FixtureMatchTeamProps> = ({
  team,
  goals,
}) => {
  return (
    <Flex alignItems="center" gap={2}>
      <Flex alignItems="center" gap={1} flex="1 1 auto">
        <Box>
          <Img w={15} h={15} alt={team.name} src={team.logo} />
        </Box>
        <Text fontSize="sm" fontWeight={team.winner ? "700" : "400"}>
          {team.name}
        </Text>
      </Flex>
      <Text fontSize="xs">{goals ?? "-"}</Text>
    </Flex>
  );
};
