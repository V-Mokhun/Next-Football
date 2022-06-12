import { MenuList } from "@chakra-ui/react";
import React from "react";
import { MenuThemeToggler } from "./MenuThemeToggler";

interface MenuDropdownProps {
  SettingsMenuItem: React.ReactNode;
}

export const MenuDropdown: React.FC<MenuDropdownProps> = ({ SettingsMenuItem }) => {
  return (
    <MenuList>
      {SettingsMenuItem}
      <MenuThemeToggler />
    </MenuList>
  );
};
