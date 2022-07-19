import { searchModalModel } from "@/entities/search";
import { viewerModel } from "@/entities/viewer";
import { FavoriteTeamButton } from "@/features/toggle-favorite/toggle-favorite-team";
import { TEAM_ROUTE } from "@/shared/lib";
import { StarIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading, Image, VStack } from "@chakra-ui/react";
import { useEvent, useStore } from "effector-react";
import { useRouter } from "next/router";
import React from "react";

interface SidebarTeamsProps {}

export const SidebarTeams: React.FC<SidebarTeamsProps> = ({}) => {
  const teams = useStore(viewerModel.$viewerFavoriteTeams);
  const onAddTeams = useEvent(searchModalModel.buttonClicked);
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
        {teams?.length > 0 ? (
          teams.map((team) => (
            <Flex
              key={team.id}
              width="100%"
              alignItems="center"
              justifyContent="space-between"
              gap={2}
              p={1}
              borderRadius={10}>
              <Flex
                cursor="pointer"
                alignItems="center"
                gap={1}
                onClick={() => {
                  router.push(`${TEAM_ROUTE}/${team.id}`);
                }}>
                <Box flex="0 0 18px">
                  <Image
                    src={team.logo}
                    alt={team.name}
                    width={18}
                    height={18}
                  />
                </Box>
                <Heading as="p" size="xs">
                  {team.name}
                </Heading>
              </Flex>
              <FavoriteTeamButton data={team} size="small" />
            </Flex>
          ))
        ) : (
          <Button onClick={onAddTeams} w="100%" variant="outline">
            Add teams
          </Button>
        )}
      </VStack>
    </Box>
  );
};
