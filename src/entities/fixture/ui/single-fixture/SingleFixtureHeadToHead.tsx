import { convertToReadableDate } from "@/shared/lib";
import { Text } from "@chakra-ui/react";
import { useList } from "effector-react";
import { FixtureMatch, fixtureModel } from "../..";
import { SingleFixtureTitle } from "./SingleFixtureTitle";

export const SingleFixtureHeadToHead = () => {
  const list = useList(fixtureModel.singleFixtureSubmodel.$headToHead, {
    fn: (fixture) => (
      <FixtureMatch
        fixtureData={fixture}
        dateText={convertToReadableDate(
          fixture.fixture.date,
          false,
          true,
          false
        )}
        showLeague={true}
      />
    ),
    placeholder: <Text>No head to head`s found.</Text>,
  });

  return (
    <>
      <SingleFixtureTitle>Head to Head</SingleFixtureTitle>
      {list}
    </>
  );
};
