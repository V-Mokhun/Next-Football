import { fixtureModel } from "@/entities/fixture";
import { useStoreMap } from "effector-react";
import React from "react";
import { SingleFixtureEvents } from "./SingleFixtureEvents";
import { SingleFixtureInfo } from "./SingleFixtureInfo";

interface SingleFixtureReviewProps {}

export const SingleFixtureReview: React.FC<SingleFixtureReviewProps> = ({}) => {
  const singleFixtureTeams = useStoreMap({
    store: fixtureModel.singleFixtureSubmodel.$singleFixture,
    keys: [],
    fn: (fixture) => (fixture ? fixture.teams : null),
  });
  const singleFixtureScore = useStoreMap({
    store: fixtureModel.singleFixtureSubmodel.$singleFixture,
    keys: [],
    fn: (fixture) => (fixture ? fixture.score : null),
  });
  const firstTimeEvents = useStoreMap({
    store: fixtureModel.singleFixtureSubmodel.$singleFixture,
    keys: [],
    fn: (fixture) => {
      if (!fixture) return [];

      return fixture.events.filter((event) => {
        if (!event.time.elapsed) return false;

        if (event.time.elapsed >= 0 && event.time.elapsed <= 45) return true;

        return false;
      });
    },
  });
  const secondTimeEvents = useStoreMap({
    store: fixtureModel.singleFixtureSubmodel.$singleFixture,
    keys: [],
    fn: (fixture) => {
      if (!fixture) return [];

      return fixture.events.filter((event) => {
        if (!event.time.elapsed) return false;

        if (event.time.elapsed >= 46 && event.time.elapsed <= 90) return true;

        return false;
      });
    },
  });

  let homeScore = 0;
  let awayScore = 0;

  if (singleFixtureScore?.fulltime.home && singleFixtureScore.halftime.home) {
    homeScore =
      singleFixtureScore.fulltime.home - singleFixtureScore.halftime.home;
  } else if (singleFixtureScore?.halftime.home) {
    homeScore = singleFixtureScore.halftime.home;
  }

  if (singleFixtureScore?.fulltime.away && singleFixtureScore.halftime.away) {
    awayScore =
      singleFixtureScore.fulltime.away - singleFixtureScore.halftime.away;
  } else if (singleFixtureScore?.halftime.away) {
    awayScore = singleFixtureScore.halftime.away;
  }

  return (
    <>
      <SingleFixtureEvents
        events={firstTimeEvents}
        title="1-st time"
        awayTeamId={singleFixtureTeams?.away.id || null}
        homeScore={singleFixtureScore?.halftime.home ?? 0}
        awayScore={singleFixtureScore?.halftime.away ?? 0}
      />
      <SingleFixtureEvents
        events={secondTimeEvents}
        title="2-nd time"
        awayTeamId={singleFixtureTeams?.away.id || null}
        homeScore={homeScore}
        awayScore={awayScore}
      />
      <SingleFixtureInfo />
    </>
  );
};
