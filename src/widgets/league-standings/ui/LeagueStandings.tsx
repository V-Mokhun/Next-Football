import { leagueModel, LeagueStandingHeader } from "@/entities/league";
import { LeagueStandingRow } from "@/entities/league/ui/LeagueStandingRow";
import { AlertMessage } from "@/shared/ui";
import {
  Box,
  Flex,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Text,
} from "@chakra-ui/react";
import { useList, useStore } from "effector-react";
import React from "react";

interface LeagueStandingsProps {}

export const LeagueStandings: React.FC<LeagueStandingsProps> = ({}) => {
  const standingsLoading = useStore(leagueModel.$leagueStandingsLoading);
  const standingsError = useStore(leagueModel.$leagueStandingsError);
  const standings = useList(leagueModel.$leagueStandings, (standing) => (
    <LeagueStandingRow standing={standing} />
  ));

  let body = null;

  if (standingsLoading) {
    body = (
      <Flex justifyContent="center" mb={2}>
        <Spinner size="xl" />
      </Flex>
    );
  } else if (standingsError) {
    body = <AlertMessage error={standingsError} />;
  } else if ((Array.isArray(standings) && standings.length < 1) || !standings) {
    body = <Text textAlign="center">No standings found.</Text>;
  } else {
    body = (
      <>
        <TableContainer>
          <Table variant="simple">
            <LeagueStandingHeader />
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

  return (
    <Box mb={4} borderRadius="8px" p="12px" backgroundColor="main.500">
      {body}
    </Box>
  );
};
