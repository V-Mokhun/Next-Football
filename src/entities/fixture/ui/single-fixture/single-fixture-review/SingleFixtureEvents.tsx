import { Event } from "@/shared/api";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { SingleFixtureEvent } from "./SingleFixtureEvent";

interface SingleFixtureEventsProps {
  events: Event[];
  homeScore: number;
  awayScore: number;
  title: string;
  awayTeamId: number | null;
}

export const SingleFixtureEvents: React.FC<SingleFixtureEventsProps> = ({
  awayScore,
  events,
  homeScore,
  title,
  awayTeamId,
}) => {
  return events.length > 0 ? (
    <Box mb={2}>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        gap={2}
        backgroundColor="main.400"
        py={1}
        px={3}
        borderRadius="8px"
        fontSize="md"
        mb={2}
      >
        <span>{title}</span>
        <span>
          {homeScore} - {""}
          {awayScore}
        </span>
      </Flex>
      {events.map((event) => (
        <SingleFixtureEvent
          key={`${event.time.elapsed}-${event.type}-${event.player.id}`}
          event={event}
          isAwayTeam={event.team.id === awayTeamId}
        />
      ))}
    </Box>
  ) : null;
};
