import { Event } from "@/shared/api";
import { RepeatIcon, WarningTwoIcon } from "@chakra-ui/icons";
import { Flex, Text } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface SingleFixtureEventProps {
  event: Event;
  isAwayTeam?: boolean;
}

export const SingleFixtureEvent: React.FC<SingleFixtureEventProps> = ({
  event,
  isAwayTeam = false,
}) => {
  if (event.type === "Var") return null;

  let time = `${event.time.elapsed}'`;
  let eventType: ReactNode = null;
  let eventDescription: ReactNode = null;

  if (event.type === "subst") {
    eventType = <RepeatIcon flex="0 0 16px" />;
    eventDescription = (
      <>
        <Text>{event.player.name}</Text>
        {event.assist.name && (
          <Text color="gray.500">({event.assist.name})</Text>
        )}
      </>
    );
  } else if (event.type === "Card") {
    eventType = (
      <WarningTwoIcon
        color={event.detail.includes("Yellow") ? "yellow.400" : "red.400"}
        flex="0 0 16px"
      />
    );
    eventDescription = (
      <>
        <Text>{event.player.name}</Text>
        {event.comments && <Text color="gray.500">({event.comments})</Text>}
      </>
    );
  } else if (event.type === "Goal") {
    eventType = (
      <Text
        color={event.detail.includes("Own") ? "red.400" : "initial"}
        fontSize="sm"
      >
        GOAL
      </Text>
    );
    eventDescription = (
      <>
        <Text>{event.player.name}</Text>
        {event.assist.name && (
          <Text color="gray.500">({event.assist.name})</Text>
        )}
      </>
    );
  }

  if (event.time.extra) {
    time = `${event.time.elapsed}+${event.time.extra}'`;
  }

  return (
    <Flex
      flexDirection={isAwayTeam ? "row-reverse" : "row"}
      alignItems="center"
      gap={2}
      py={2}
      px={4}
    >
      <Text fontSize="sm" fontWeight={700} color="gray.400">
        {time}
      </Text>
      <Flex
        alignItems="center"
        justifyContent="center"
        p={1.5}
        borderRadius="8px"
        borderWidth={1}
        borderStyle="solid"
        borderColor="main.400"
      >
        {eventType}
      </Flex>
      <Flex
        flexDir={isAwayTeam ? "row-reverse" : "row"}
        alignItems="center"
        gap={1}
      >
        {eventDescription}
      </Flex>
    </Flex>
  );
};
