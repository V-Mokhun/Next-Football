import { viewerModel } from "@/entities/viewer";
import { countriesModel } from "@/features/countries";
import {
  Box,
  Button,
  Heading,
  StackDivider,
  useColorMode,
  VStack
} from "@chakra-ui/react";
import { useEvent, useStore } from "effector-react";
import React, { useEffect } from "react";
import { SidebarCountries } from "./SidebarCountries";
import { SidebarLeagues } from "./SidebarLeagues";
import { SidebarTeams } from "./SidebarTeams";

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = ({}) => {
  const { colorMode } = useColorMode();
  const isAuthenticated = useStore(viewerModel.$isAuthenticated);
  const onLogin = useEvent(viewerModel.openAuthModal);
  const sidebarLoaded = useEvent(countriesModel.sidebarLoaded);

  useEffect(sidebarLoaded, []);

  return (
    <aside>
      <VStack
        divider={
          <StackDivider
            borderColor={colorMode === "dark" ? "gray.900" : "gray.200"}
          />
        }
        spacing={4}
        alignItems="flex-start">
        {isAuthenticated ? (
          <>
            <SidebarLeagues />
            <StackDivider
              borderColor={colorMode === "dark" ? "gray.900" : "gray.200"}
              my={4}
              borderBottomWidth={1}
            />
            <SidebarTeams />
          </>
        ) : (
          <Box>
            <Heading textAlign="center" mb={2} as="h3" size="sm">
              Log in to add favorite leagues and teams
            </Heading>
            <Button variant="outline" w="100%" onClick={onLogin}>
              Log in
            </Button>
          </Box>
        )}
        <SidebarCountries />
      </VStack>
    </aside>
  );
};
