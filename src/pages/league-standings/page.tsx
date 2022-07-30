import { LeagueHeader } from "@/entities/league";
import { FavoriteLeagueButton } from "@/features/toggle-favorite/toggle-favorite-league";
import { LeagueStandings } from "@/widgets/league-standings";
import React from "react";

interface LeagueStandingsPageProps {}

export const LeagueStandingsPage: React.FC<LeagueStandingsPageProps> = ({}) => {
  return (
    <>
      <LeagueHeader FavoriteComponent={FavoriteLeagueButton} />
      <LeagueStandings />
    </>
  );
};
