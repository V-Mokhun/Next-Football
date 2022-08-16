import { Player } from "@/shared/api";
import { ChakraImage } from "@/shared/ui";
import { Flex, Td, Tr, useColorMode } from "@chakra-ui/react";
import React from "react";

interface TeamSquadPlayerProps {
  player: Player;
  isEven: boolean;
}

export const TeamSquadPlayer: React.FC<TeamSquadPlayerProps> = ({
  player,
  isEven,
}) => {
  const { colorMode } = useColorMode();

  let bgColor = "initial";

  if (isEven) {
    bgColor = colorMode === "dark" ? "main.400" : "rgba(238,238,238, 0.4)";
  }

  return (
    <Tr>
      <Td
        borderRadius="4px 0 0 4px"
        backgroundColor={bgColor}
        textAlign="center"
        px={2}
        py={3}
      >
        <Flex textAlign="center" justifyContent="center" alignItems="center">
          <ChakraImage
            mx="auto"
            src={player.photo}
            alt={player.name}
            width={50}
            height={50}
            borderRadius="8px"
          />
        </Flex>
      </Td>
      <Td backgroundColor={bgColor} textAlign="center" px={2} py={3}>
        {player.number ?? 0}
      </Td>
      <Td backgroundColor={bgColor} px={2} py={3}>
        {player.name}
      </Td>
      <Td
        borderRadius="0 4px 4px 0"
        backgroundColor={bgColor}
        textAlign="center"
        px={2}
        py={3}
      >
        {player.age}
      </Td>
    </Tr>
  );
};
