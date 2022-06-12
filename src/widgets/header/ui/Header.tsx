import { MenuButton, MenuDropdown } from "@/entities/menu";
import { Search } from "@/entities/search";
import { Settings } from "@/entities/settings";
import { Box, Container, Flex, Menu } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <header>
      <Container maxW="container.lg">
        <Flex py={5} justifyContent="space-between" alignItems="center" gap={2}>
          <Box>
            <Image src="/images/logo.png" alt="Logo" width={64} height={64} />
          </Box>
          <Flex alignItems="center" gap={2}>
            <Search />
            <Menu closeOnSelect={false}>
              {({ isOpen }) => (
                <>
                  <MenuButton isActive={isOpen} />
                  <MenuDropdown SettingsMenuItem={<Settings />} />
                </>
              )}
            </Menu>
          </Flex>
        </Flex>
      </Container>
    </header>
  );
};
