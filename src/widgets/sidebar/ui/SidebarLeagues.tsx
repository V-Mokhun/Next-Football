import { searchModalModel } from "@/entities/search";
import { viewerModel } from "@/entities/viewer";
import { FavoriteLeagueButton } from "@/features/toggle-favorite/toggle-favorite-league";
import { LEAGUE_ROUTE } from "@/shared/lib";
import { StarIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading, Image, VStack } from "@chakra-ui/react";
import { useEvent, useStore } from "effector-react";
import { useRouter } from "next/router";
import React from "react";

interface SidebarLeaguesProps {}

export const SidebarLeagues: React.FC<SidebarLeaguesProps> = ({}) => {
  const leagues = useStore(viewerModel.$viewerFavoriteLeagues);
  const onAddLeagues = useEvent(searchModalModel.buttonClicked);
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
        {leagues.length > 0 ? (
          leagues.map((league) => (
            <Flex
              key={league.id}
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
                  router.push(`${LEAGUE_ROUTE}/${league.id}`);
                }}>
                <Box flex="0 0 18px">
                  <Image
                    src={league.logo}
                    alt={league.name}
                    width={18}
                    height={18}
                  />
                </Box>
                <Heading as="p" size="xs">
                  {league.name}
                </Heading>
              </Flex>
              <FavoriteLeagueButton data={league} size="small" />
            </Flex>
          ))
        ) : (
          <Button onClick={onAddLeagues} w="100%" variant="outline">
            Add leagues
          </Button>
        )}
      </VStack>
    </Box>
  );
};
