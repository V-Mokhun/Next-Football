import { Button, ButtonGroup } from "@chakra-ui/react";
import { useEvent, useStore } from "effector-react";
import React from "react";
import { fixtureModel } from "../..";

interface FixtureButtonsProps {}

export const FixtureButtons: React.FC<FixtureButtonsProps> = ({}) => {
  const allFixturesSelected = useEvent(
    fixtureModel.fixturesSubmodel.allFixturesSelected
  );
  const liveFixturesSelected = useEvent(
    fixtureModel.fixturesSubmodel.liveFixturesSelected
  );
  const isLiveFixturesSelected = useStore(
    fixtureModel.fixturesSubmodel.$isLiveFixtures
  );
  const isButtonsDisabled = useStore(
    fixtureModel.fixturesSubmodel.$buttonsDisabled
  );

  return (
    <ButtonGroup isDisabled={isButtonsDisabled} gap={2}>
      <Button
        size="sm"
        onClick={() => allFixturesSelected()}
        variant="solid"
        isActive={!isLiveFixturesSelected}
        _active={{
          bgColor: "primary.500",
        }}
      >
        ALL
      </Button>
      <Button
        size="sm"
        onClick={() => liveFixturesSelected()}
        variant="solid"
        isActive={isLiveFixturesSelected}
        _active={{
          bgColor: "primary.500",
        }}
      >
        LIVE
      </Button>
    </ButtonGroup>
  );
};
