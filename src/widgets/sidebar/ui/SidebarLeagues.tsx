import { searchModalModel } from "@/entities/search";
import { viewerModel } from "@/entities/viewer";
import { searchModel } from "@/features/search";
import { FavoriteLeagueButton } from "@/features/toggle-favorite/toggle-favorite-league";
import { LEAGUE_ROUTE } from "@/shared/lib";
import { SidebarItem } from "@/shared/ui";
import { StarIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import { useEvent, useStore } from "effector-react";
import { useRouter } from "next/router";
import React from "react";

interface SidebarLeaguesProps {}

export const SidebarLeagues: React.FC<SidebarLeaguesProps> = ({}) => {
  const leagues = useStore(viewerModel.$viewerFavoriteLeagues);
  const onAddLeagues = useEvent(searchModalModel.buttonClicked);
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
        <StarIcon /> <span>My leagues</span>
      </Heading>
      <VStack w="100%" spacing={2}>
          {leagues?.map((league) => (
            <SidebarItem
              key={league.id}
              favoriteComponent={
                <FavoriteLeagueButton isAbsolute={true} data={league} size="small" />
              }
              id={league.id}
              logo={league.logo}
              name={league.name}
              onClick={() => {
                router.push(`${LEAGUE_ROUTE}/${league.id}`);
              }}
            />
          ))}
          <Button onClick={() => {
            onAddLeagues()
            changeSearchMode("leagues")
          }} w="100%" variant="outline">
            Add leagues
          </Button>
      </VStack>
    </Box>
  );
};
