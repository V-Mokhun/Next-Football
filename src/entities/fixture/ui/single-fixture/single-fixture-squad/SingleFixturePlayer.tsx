import { LineupStart } from "@/shared/api";
import { Flex, Text, useColorMode } from "@chakra-ui/react";
import React from "react";

interface SingleFixturePlayerProps {
  player: LineupStart<string | null>["player"];
  isAway?: boolean;
  isOdd?: boolean;
}

export const SingleFixturePlayer: React.FC<SingleFixturePlayerProps> = ({
  player,
  isAway = false,
  isOdd = false,
}) => {
  const { colorMode } = useColorMode();
  let bgColor = "initial";

  if (isOdd) {
    bgColor = colorMode === "dark" ? "#01171f" : "#f7f8f8";
  }

  return (
    <Flex
      bgColor={bgColor}
      py={2}
      px={3}
      flexDir={isAway ? "row-reverse" : "row"}
      gap={1}
      alignItems="center"
      borderTopRightRadius={isAway ? "8px" : 0}
      borderBottomRightRadius={isAway ? "8px" : 0}
      borderTopLeftRadius={!isAway ? "8px" : 0}
      borderBottomLeftRadius={!isAway ? "8px" : 0}
    >
      <Text flex="0 0 20px">{player.number ?? 0}</Text>
      <Text flex="1 1 auto">{player.name}</Text>
    </Flex>
  );
};
