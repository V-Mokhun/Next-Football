import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { IconButton, MenuButton as MenuButtonIcon } from "@chakra-ui/react";
import React from "react";

interface MenuButtonProps {
  isActive: boolean;
}

export const MenuButton: React.FC<MenuButtonProps> = ({ isActive }) => {
  return (
    <MenuButtonIcon
      isActive={isActive}
      as={IconButton}
      icon={isActive ? <CloseIcon /> : <HamburgerIcon />}
    />
  );
};
