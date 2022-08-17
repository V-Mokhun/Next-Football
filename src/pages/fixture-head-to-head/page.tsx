import {
  fixtureModel,
  SingleFixtureHeader,
  SingleFixtureHeadToHead,
} from "@/entities/fixture";
import { viewerModel } from "@/entities/viewer";
import { FavoriteTeamButton } from "@/features/toggle-favorite/toggle-favorite-team";
import { AlertMessage } from "@/shared/ui";
import { Flex, Spinner } from "@chakra-ui/react";
import { useStore } from "effector-react";
import { ReactNode } from "react";

export const FixtureHeadToHeadPage = () => {
  const isAuthenticated = useStore(viewerModel.$isAuthenticated);
  const headToHeadError = useStore(
    fixtureModel.singleFixtureSubmodel.$headtoHeadError
  );
  const error = useStore(
    fixtureModel.singleFixtureSubmodel.$singleFixtureError
  );
  const fixtureLoading = useStore(
    fixtureModel.singleFixtureSubmodel.$singleFixtureLoading
  );
  const headToHeadloading = useStore(
    fixtureModel.singleFixtureSubmodel.$headToHeadLoading
  );
  let body: ReactNode = null;

  if (fixtureLoading) {
    body = (
      <Flex justifyContent="center" mb={2}>
        <Spinner size="xl" />
      </Flex>
    );
  } else if (error) {
    body = <AlertMessage error={error} />;
  } else if (headToHeadError) {
    body = (
      <>
        <SingleFixtureHeader
          FavoriteComponent={isAuthenticated ? FavoriteTeamButton : null}
        />
        <AlertMessage mt={2} error={error} />
      </>
    );
  } else {
    body = (
      <>
        <SingleFixtureHeader
          FavoriteComponent={isAuthenticated ? FavoriteTeamButton : null}
        />
        {headToHeadloading ? (
          <Flex justifyContent="center" mb={2}>
            <Spinner size="xl" />
          </Flex>
        ) : (
          <SingleFixtureHeadToHead />
        )}
      </>
    );
  }

  return body;
};
