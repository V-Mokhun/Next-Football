import { leagueModel } from "@/entities/league";
import { useList } from "effector-react";
import React from "react";

interface LeagueMatchesProps {}

export const LeagueMatches: React.FC<LeagueMatchesProps> = ({}) => {
  const list = useList(leagueModel.$leagueFixtures, {
    fn: (leagueFixture) => {
      return null;
    },
  });

  return <div>matches</div>;
};
