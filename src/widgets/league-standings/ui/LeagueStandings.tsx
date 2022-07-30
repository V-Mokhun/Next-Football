import { leagueModel, LeagueStandingHeader } from "@/entities/league";
import { LeagueStandingRow } from "@/entities/league/ui/LeagueStandingRow";
import { Box, Table, TableContainer, Tbody, Text } from "@chakra-ui/react";
import { useList } from "effector-react";
import React from "react";

interface LeagueStandingsProps {}

export const LeagueStandings: React.FC<LeagueStandingsProps> = ({}) => {
  const standings = useList(leagueModel.$leagueStandings, (standing) => (
    <LeagueStandingRow standing={standing} />
  ));

  return (
    <Box mb={4} borderRadius="8px" p="12px" backgroundColor="main.500">
      {Array.isArray(standings) && standings.length < 1 ? (
        <Text textAlign="center"> No standings found. </Text>
      ) : (
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
      )}
    </Box>
  );
};
