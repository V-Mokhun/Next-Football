import { SearchButton } from "@/entities/search";
import { SettingsItem } from "@/entities/settings";
import { viewerModel, ViewerPopover } from "@/entities/viewer";
import { ChangePasswordButton } from "@/features/auth/change-password";
import { LogoutButton } from "@/features/auth/logout";
import { ThemeToggler } from "@/features/theme-toggle";
import { HOME_ROUTE } from "@/shared/lib";
import { MenuButton } from "@/shared/ui";
import { MoonIcon } from "@chakra-ui/icons";
import {
  Container,
  Flex,
  FormLabel,
  Menu,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useStore } from "effector-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  const isAuth = useStore(viewerModel.viewerSubmodel.$isAuth);

  return (
    <header style={{ backgroundColor: "#001e28" }}>
      <Container maxW="container.lg">
        <Flex py={5} justifyContent="space-between" alignItems="center" gap={2}>
          <Link href={HOME_ROUTE} passHref>
            <a>
              <Image src="/images/logo.png" alt="Logo" width={64} height={64} />
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
            <Menu closeOnSelect={false}>
              {({ isOpen }) => (
                <>
                  <MenuButton isActive={isOpen} />
                  <MenuList>
                    {isAuth && <SettingsItem />}
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
