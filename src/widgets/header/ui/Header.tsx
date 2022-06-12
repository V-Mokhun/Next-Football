import { MenuButton } from "@/entities/menu";
import { Search } from "@/entities/search";
import { Settings } from "@/entities/settings";
import { ThemeToggler } from "@/features/theme-toggle";
import { MoonIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Flex,
  FormLabel,
  Menu,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <header style={{ backgroundColor: "#001e28" }}>
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
                  <MenuList>
                    <Settings />
                    <MenuItem display="flex" alignItems="center" gap={2}>
                      <MoonIcon />
                      <FormLabel
                        flex="1 1 auto"
                        cursor="pointer"
                        htmlFor="color-mode"
                        mb={0}
                        mr={0}>
                        Dark mode
                      </FormLabel>
                      <ThemeToggler />
                    </MenuItem>
                  </MenuList>
                </>
              )}
            </Menu>
          </Flex>
        </Flex>
      </Container>
    </header>
  );
};
