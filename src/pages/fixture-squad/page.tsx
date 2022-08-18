import {
  fixtureModel,
  SingleFixtureHeader,
  SingleFixtureSquad,
} from "@/entities/fixture";
import { viewerModel } from "@/entities/viewer";
import { FavoriteTeamButton } from "@/features/toggle-favorite/toggle-favorite-team";
import { AlertMessage } from "@/shared/ui";
import { Flex, Spinner } from "@chakra-ui/react";
import { useStore } from "effector-react";
import { ReactNode } from "react";

export const FixtureSquadPage = () => {
  const isAuthenticated = useStore(viewerModel.$isAuthenticated);
  const error = useStore(
    fixtureModel.singleFixtureSubmodel.$singleFixtureError
  );
  const loading = useStore(
    fixtureModel.singleFixtureSubmodel.$singleFixtureLoading
  );
  let body: ReactNode = null;

  if (loading) {
    body = (
      <Flex justifyContent="center" mb={2}>
        <Spinner size="xl" />
      </Flex>
    );
  } else if (error) {
    body = <AlertMessage error={error} />;
  } else {
    body = (
      <>
        <SingleFixtureHeader
          FavoriteComponent={isAuthenticated ? FavoriteTeamButton : null}
        />
        <SingleFixtureSquad />
      </>
    );
  }

  return body;
};
