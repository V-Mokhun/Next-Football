import { Standing } from "@/shared/api";
import { AlertMessage, CardBlock } from "@/shared/ui";
import {
  Flex,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Text,
} from "@chakra-ui/react";
import { Store } from "effector";
import { useList } from "effector-react";
import React from "react";
import { StandingHeader } from "./StandingHeader";
import { StandingRow } from "./StandingRow";

interface StandingsProps {
  loading: boolean;
  error: string;
  store: Store<Standing[]>;
  selectedTeam?: number;
}

export const Standings: React.FC<StandingsProps> = ({
  loading,
  error,
  store,
  selectedTeam,
}) => {
  const standings = useList(store, (standing) => {
    if (!standing) return null;

    const isSelected = standing.team.id === selectedTeam;
    return <StandingRow standing={standing} isTeamSelected={isSelected} />;
  });

  let body = null;

  if (loading) {
    body = (
      <Flex justifyContent="center" mb={2}>
        <Spinner size="xl" />
      </Flex>
    );
  } else if (error) {
    body = <AlertMessage error={error} />;
  } else if ((Array.isArray(standings) && standings.length < 1) || !standings) {
    body = <Text textAlign="center">No standings found.</Text>;
  } else {
    body = (
      <>
        <TableContainer maxWidth="calc(100vw - 30px)">
          <Table variant="simple">
            <StandingHeader />
            <Tbody>{standings}</Tbody>
          </Table>
        </TableContainer>
        <Text fontSize="xs" mx={2} mt={4} mb={2}>
          If the teams end the season with the same number of points, the team
          with the better head-to-head results wins.
        </Text>
      </>
    );
  }

  return <CardBlock mb={4}>{body}</CardBlock>;
};
