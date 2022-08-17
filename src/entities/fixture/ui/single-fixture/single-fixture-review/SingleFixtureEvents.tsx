import { Event } from "@/shared/api";
import { Box } from "@chakra-ui/react";
import React from "react";
import { SingleFixtureTitle } from "../SingleFixtureTitle";
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
      <SingleFixtureTitle>
        <span>{title}</span>
        <span>
          {homeScore} - {""}
          {awayScore}
        </span>
      </SingleFixtureTitle>
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
