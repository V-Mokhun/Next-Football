import { Select } from "@chakra-ui/react";
import { useEvent, useStore } from "effector-react";
import React from "react";
import { leagueModel } from "..";

interface LeagueRoundsSelectProps {}

export const LeagueRoundsSelect: React.FC<LeagueRoundsSelectProps> = ({}) => {
  const leagueRounds = useStore(leagueModel.$leagueRounds);
  const isLoading = useStore(leagueModel.$leagueFixturesLoading);
  const activeRoundSet = useEvent(leagueModel.activeRoundSet);

  return (
    <Select
      gap={2}
      mb={4}
      isDisabled={isLoading}
      placeholder="Select round"
      onChange={(e) => {
        activeRoundSet(e.target.value);
      }}
    >
      {leagueRounds.map((round) => (
        <option key={round} value={round}>
          {round}
        </option>
      ))}
    </Select>
  );
};
