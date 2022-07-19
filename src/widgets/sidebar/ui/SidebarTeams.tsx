import { searchModalModel } from "@/entities/search";
import { viewerModel } from "@/entities/viewer";
import { searchModel } from "@/features/search";
import { FavoriteTeamButton } from "@/features/toggle-favorite/toggle-favorite-team";
import { TEAM_ROUTE } from "@/shared/lib";
import { SidebarItem } from "@/shared/ui";
import { StarIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import { useEvent, useStore } from "effector-react";
import { useRouter } from "next/router";
import React from "react";

interface SidebarTeamsProps {}

export const SidebarTeams: React.FC<SidebarTeamsProps> = ({}) => {
  const teams = useStore(viewerModel.$viewerFavoriteTeams);
  const onAddTeams = useEvent(searchModalModel.buttonClicked);
  const changeSearchMode = useEvent(searchModel.changeSearchMode)
  const router = useRouter();

  return (
    <Box w="100%">
      <Heading
        mb={3}
        display="flex"
        alignItems="center"
        gap={2}
        as="h3"
        size="sm">
        <StarIcon /> <span>My teams</span>
      </Heading>
      <VStack w="100%" spacing={2}>
          {teams?.map((team) => (
            <SidebarItem
              key={team.id}
              favoriteComponent={
                <FavoriteTeamButton data={team} size="small" />
              }
              id={team.id}
              logo={team.logo}
              name={team.name}
              onClick={() => {
                router.push(`${TEAM_ROUTE}/${team.id}`);
              }}
            />
          ))}
          <Button onClick={() => {
            onAddTeams()
            changeSearchMode("teams")
          }} w="100%" variant="outline">
            Add teams
          </Button>
      </VStack>
    </Box>
  );
};
