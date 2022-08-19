import { LeagueHeader, leagueModel } from "@/entities/league";
import { FavoriteLeagueButton } from "@/features/toggle-favorite/toggle-favorite-league";
import { LeagueMatches } from "@/widgets/league-matches";
import { LeagueStandings } from "@/widgets/league-standings";
import { useStore } from "effector-react";
import React from "react";

interface LeaguePageProps {}

export const LeaguePage: React.FC<LeaguePageProps> = ({}) => {
  const leagueFixture = useStore(leagueModel.$league);

  if (!leagueFixture) return null;

  return (
    <>
      <LeagueHeader FavoriteComponent={FavoriteLeagueButton} />
      <LeagueMatches />
      {leagueFixture.seasons[0]?.coverage?.standings && <LeagueStandings />}
    </>
  );
};
