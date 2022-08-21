import { FixtureTeam } from "@/shared/api";
import { ChakraImage } from "@/shared/ui";
import { Flex, Text } from "@chakra-ui/react";
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
        <Flex flex="0 0 15px" justifyContent="center" alignItems="center">
          <ChakraImage width={15} height={15} alt={team.name} src={team.logo} />
        </Flex>
        <Text fontSize="sm" fontWeight={team.winner ? "700" : "400"}>
          {team.name}
        </Text>
      </Flex>
      <Text fontWeight={700} fontSize="xs">
        {goals ?? "-"}
      </Text>
    </Flex>
  );
};
