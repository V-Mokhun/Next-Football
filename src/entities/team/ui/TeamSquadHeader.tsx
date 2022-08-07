import { Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";

interface TeamSquadHeaderProps {}

export const TeamSquadHeader: React.FC<TeamSquadHeaderProps> = ({}) => {
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
          Picture
        </Th>
        <Th
          backgroundColor="main.400"
          borderBottom={0}
          textAlign="center"
          p={2}
        >
          #
        </Th>
        <Th backgroundColor="main.400" borderBottom={0} width="70%" p={2}>
          Name
        </Th>
        <Th
          backgroundColor="main.400"
          borderBottom={0}
          textAlign="center"
          p={2}
        >
          Age
        </Th>
      </Tr>
    </Thead>
  );
};
