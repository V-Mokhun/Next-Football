import { SearchButton } from "@/entities/search";
import { SettingsItem } from "@/entities/settings";
import { viewerModel, ViewerPopover } from "@/entities/viewer";
import { ChangePasswordButton } from "@/features/auth/change-password";
import { LogoutButton } from "@/features/auth/logout";
import { ThemeToggler } from "@/features/theme-toggle";
import { HOME_ROUTE } from "@/shared/lib";
import { ChakraImage, MenuButton } from "@/shared/ui";
import { MoonIcon } from "@chakra-ui/icons";
import {
  Container,
  Flex,
  FormLabel,
  Hide,
  Menu,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useStore } from "effector-react";
import Link from "next/link";
import React, { ReactNode } from "react";

interface HeaderProps {
  mobileMenu: ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ mobileMenu }) => {
  const isAuthenticated = useStore(viewerModel.$isAuthenticated);

  return (
    <header style={{ backgroundColor: "#001e28" }}>
      <Container maxW="container.lg">
        <Flex py={5} justifyContent="space-between" alignItems="center" gap={2}>
          <Link href={HOME_ROUTE} passHref>
            <a>
              <ChakraImage
                src="/images/logo.png"
                alt="Logo"
                width={64}
                height={64}
              />
            </a>
          </Link>
          <Flex alignItems="center" gap={2}>
            <SearchButton />
            <ViewerPopover
              renderContent={({ onClose }) => (
                <>
                  <ChangePasswordButton onButtonClick={onClose} />
                  <LogoutButton onButtonClick={onClose} />
                </>
              )}
            />
            <Menu placement="bottom-end" closeOnSelect={false}>
              {({ isOpen }) => (
                <>
                  <MenuButton isActive={isOpen} />
                  <MenuList
                    minWidth={{ base: "calc(100vw - 30px)", md: "200px" }}
                    maxWidth={{ base: "calc(100vw - 30px)", md: "none" }}
                    maxHeight={{ base: "calc(100vh - 100px)", md: "none" }}
                    overflowY={{ base: "auto", md: "initial" }}
                  >
                    {isAuthenticated && <SettingsItem />}
                    <MenuItem display="flex" alignItems="center" gap={2}>
                      <MoonIcon />
                      <FormLabel
                        flex="1 1 auto"
                        cursor="pointer"
                        htmlFor="color-mode"
                        mb={0}
                        mr={0}
                      >
                        Dark mode
                      </FormLabel>
                      <ThemeToggler />
                    </MenuItem>
                    <Hide above="md">{mobileMenu}</Hide>
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
