import { LineupStart, LineupTeam } from "@/shared/api";
import { CardBlock } from "@/shared/ui";
import { Box, Flex, Text, useColorMode } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { SingleFixtureTitle } from "../SingleFixtureTitle";
import { SingleFixtureFieldSquad } from "./SingleFixtureFieldSquad";

interface SingleFixtureFieldProps {
  homeTeamFormation: string;
  awayTeamFormation: string;
  homeTeamSquad: LineupStart<string>[];
  awayTeamSquad: LineupStart<string>[];
  homeTeamColors: LineupTeam["colors"];
  awayTeamColors: LineupTeam["colors"];
}

export type TransformedSquad = {
  [key: string]: LineupStart<string>["player"][];
};

export const SingleFixtureField: React.FC<SingleFixtureFieldProps> = ({
  awayTeamFormation,
  awayTeamSquad,
  homeTeamFormation,
  homeTeamSquad,
  homeTeamColors,
  awayTeamColors,
}) => {
  const { colorMode } = useColorMode();
  const transformedHomeTeamSquad = useMemo(() => {
    const squad: TransformedSquad = {};

    homeTeamSquad.forEach(({ player }) => {
      const [playerGrid] = player.grid.split(":");

      if (squad[playerGrid]) {
        squad[playerGrid].push(player);
      } else {
        squad[playerGrid] = [player];
      }
    });

    return squad;
  }, [homeTeamSquad]);
  const transformedAwayTeamSquad = useMemo(() => {
    const squad: TransformedSquad = {};

    awayTeamSquad.forEach(({ player }) => {
      const [playerGrid] = player.grid.split(":");

      if (squad[playerGrid]) {
        squad[playerGrid].push(player);
      } else {
        squad[playerGrid] = [player];
      }
    });

    return squad;
  }, [awayTeamSquad]);

  return (
    <>
      <SingleFixtureTitle>
        <Text>{homeTeamFormation}</Text>
        <Text>Tactic formation</Text>
        <Text>{awayTeamFormation}</Text>
      </SingleFixtureTitle>
      <CardBlock
        mb={4}
        backgroundColor={colorMode === "dark" ? "main.500" : "#eee"}
        position="relative"
        height="465px"
      >
        <Flex height="100%" gap={4} width="95%" mx="auto">
          <SingleFixtureFieldSquad
            squad={transformedHomeTeamSquad}
            colors={homeTeamColors}
          />
          <SingleFixtureFieldSquad
            squad={transformedAwayTeamSquad}
            colors={awayTeamColors}
            isAway={true}
          />
        </Flex>
        <Box
          position="absolute"
          left="50%"
          top="12px"
          transform="translateX(-50%)"
          mx="auto"
          w="95%"
          pointerEvents="none"
          userSelect="none"
        >
          <svg
            viewBox="0 0 1150 720"
            stroke="#808080"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 575,20 L 50,20 50,700 1100,700 1100,20 575,20 575,700 z"
              stroke="#808080"
              strokeWidth="2"
              fill="transparent"
            />
            <circle
              cx="575"
              cy="360"
              r="91.5"
              stroke="#808080"
              strokeWidth="2"
              fillOpacity="0"
            />
            <circle cx="575" cy="360" r="2" stroke="#808080" fill="white" />
            <circle cx="160" cy="360" r="2" stroke="#808080" fill="white" />
            <circle cx="990" cy="360" r="2" stroke="#808080" fill="white" />
            <path
              d="M 50,324.4 L 40,324.4 40, 396.6 50 396.6 z"
              stroke="#808080"
              strokeWidth="2"
              fillOpacity="0"
            />
            <path
              d="M 1100,324.4 L 1110,324.4 1110,396.6 1100,396.6 z"
              stroke="#808080"
              strokeWidth="2"
              fillOpacity="0"
            />
            <path
              d="M 50,269.4 L 105,269.4 105,451.6 50 451.6 z"
              stroke="#808080"
              strokeWidth="2"
              fillOpacity="0"
            />
            <path
              d="M 1100,269.4 L 1045,269.4 1045,451.6 1100,451.6 z"
              stroke="#808080"
              strokeWidth="2"
              fillOpacity="0"
            />
            <path
              d="M 50,159.4 L 215,159.4 215,561.6 50 561.6 z"
              stroke="#808080"
              strokeWidth="2"
              fillOpacity="0"
            />
            <path
              d="M 1100,159.4 L 935,159.4 935,561.6 1100,561.6 z"
              stroke="#808080"
              strokeWidth="2"
              fillOpacity="0"
            />
            <path
              d="M 215,286.875 A 91.5,91.5 0 0,1 215,433.125 z"
              stroke="#808080"
              strokeWidth="2"
              fill="transparent"
            />
            <path
              d="M 935,286.875 A 91.5,91.5 0 0,0 935,433.125 z"
              stroke="#808080"
              strokeWidth="2"
              fill="transparent"
            />
            <path
              d="M 50,30 A 10,10 0 0,0 60,20 L 50,20 z"
              stroke="#808080"
              strokeWidth="2"
              fillOpacity="0"
            />
            <path
              d="M 60,700 A 10,10 0 0,0 50,690 L 50,700 z"
              stroke="#808080"
              strokeWidth="2"
              fillOpacity="0"
            />
            <path
              d="M 1100,690 A 10,10 0 0,0 1090,700 L 1100,700 z"
              stroke="#808080"
              strokeWidth="2"
              fillOpacity="0"
            />
            <path
              d="M 1090,20 A 10,10 0 0,0 1100,30 L 1100,20 z"
              stroke="#808080"
              strokeWidth="2"
              fillOpacity="0"
            />
          </svg>
        </Box>
      </CardBlock>
    </>
  );
};
