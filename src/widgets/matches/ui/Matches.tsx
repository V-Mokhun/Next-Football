import { FixtureLeague, FixtureMatch, fixtureModel } from "@/entities/fixture";
import { viewerModel } from "@/entities/viewer";
import { FavoriteLeagueButton } from "@/features/toggle-favorite/toggle-favorite-league";
import { Accordion } from "@chakra-ui/react";
import { useList, useStore } from "effector-react";
import React from "react";

interface MatchesProps {}

export const Matches: React.FC<MatchesProps> = ({}) => {
  const isAuthenticated = useStore(viewerModel.$isAuthenticated);
  const viewerFavoriteLeagues = useStore(viewerModel.$viewerFavoriteLeagues);
  const openedFixturesIndexes: number[] = [];

  const list = useList(fixtureModel.$fixtures, {
    keys: [viewerFavoriteLeagues],
    fn: (fixtureObj, index) => {
      const fixtures = Object.values(fixtureObj)[0];

      if (fixtures.length <= 0) return null;

      const isFavoriteLeague = viewerFavoriteLeagues.find(
        (league) => league.id === fixtures[0].league.id
      );
      if (isFavoriteLeague) {
        openedFixturesIndexes.push(index);
      }

      const matches = fixtures.map((fixture) => (
        <FixtureMatch key={fixture.fixture.id} fixtureData={fixture} />
      ));

      return (
        <FixtureLeague
          isFavorite={Boolean(isFavoriteLeague)}
          FavoriteComponent={isAuthenticated ? FavoriteLeagueButton : null}
          league={fixtures[0].league}
          matches={matches}
          matchesQuantity={matches.length}
        />
      );
    },
  });

  return (
    <Accordion defaultIndex={openedFixturesIndexes} pb={4} allowMultiple>
      {list}
    </Accordion>
  );
};
