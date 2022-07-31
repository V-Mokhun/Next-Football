import { Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";

interface LeagueStandingHeaderProps {}

export const LeagueStandingHeader: React.FC<
  LeagueStandingHeaderProps
> = ({}) => {
  return (
    <Thead>
      <Tr>
        <Th
          borderRadius="4px 0 0 4px"
          backgroundColor="main.400"
          borderBottom={0}
          textAlign="center"
          p={2}
        >
          #
        </Th>
        <Th backgroundColor="main.400" borderBottom={0} width="80%" p={2}>
          Team
        </Th>
        <Th
          backgroundColor="main.400"
          borderBottom={0}
          textAlign="center"
          p={2}
        >
          G
        </Th>
        <Th
          backgroundColor="main.400"
          borderBottom={0}
          textAlign="center"
          p={2}
        >
          W
        </Th>
        <Th
          backgroundColor="main.400"
          borderBottom={0}
          textAlign="center"
          p={2}
        >
          D
        </Th>
        <Th
          backgroundColor="main.400"
          borderBottom={0}
          textAlign="center"
          p={2}
        >
          L
        </Th>
        <Th
          backgroundColor="main.400"
          borderBottom={0}
          textAlign="center"
          p={2}
        >
          S
        </Th>
        <Th
          backgroundColor="main.400"
          borderBottom={0}
          textAlign="center"
          p={2}
        >
          P
        </Th>
        <Th
          borderRadius="0 4px 4px 0"
          backgroundColor="main.400"
          borderBottom={0}
          textAlign="center"
          p={2}
          width="160px"
        >
          Form
        </Th>
      </Tr>
    </Thead>
  );
};
