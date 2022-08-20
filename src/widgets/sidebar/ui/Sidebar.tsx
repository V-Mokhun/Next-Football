import { viewerModel } from "@/entities/viewer";
import {
  Button,
  Flex,
  Heading,
  MenuItem,
  StackDivider,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { useEvent, useStore } from "effector-react";
import React from "react";
import { SidebarCountries } from "./SidebarCountries";
import { SidebarLeagues } from "./SidebarLeagues";
import { SidebarTeams } from "./SidebarTeams";

interface SidebarProps {
  isMobile?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobile = false }) => {
  const { colorMode } = useColorMode();
  const isAuthenticated = useStore(viewerModel.$isAuthenticated);
  const onLogin = useEvent(viewerModel.openAuthModal);

  const body = (
    <VStack
      flex="1 1 auto"
      divider={
        <StackDivider
          borderColor={colorMode === "dark" ? "gray.900" : "gray.200"}
        />
      }
      spacing={4}
      alignItems="flex-start"
    >
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
        <Flex flexDir="column" alignItems="center" width="100%">
          <Heading textAlign="center" mb={2} as="h3" size="sm">
            Log in to add favorite leagues and teams
          </Heading>
          <Button variant="outline" w="100%" onClick={onLogin}>
            Log in
          </Button>
        </Flex>
      )}
      <SidebarCountries />
    </VStack>
  );

  return isMobile ? (
    <MenuItem as={"li"} _hover={{ backgroundColor: "initial" }}>
      {body}
    </MenuItem>
  ) : (
    <aside>{body}</aside>
  );
};
