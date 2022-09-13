import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  IconButton,
  MenuButton as MenuButtonIcon,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

interface MenuButtonProps {
  isActive: boolean;
}

export const MenuButton: React.FC<MenuButtonProps> = ({ isActive }) => {
  const bg = useColorModeValue("whiteAlpha.200", "whiteAlpha.200");
  const color = useColorModeValue("whiteAlpha.900", "whiteAlpha.900");

  return (
    <MenuButtonIcon
      data-testid="menu-button"
      color={color}
      bg={bg}
      isActive={isActive}
      as={IconButton}
      icon={
        isActive ? (
          <CloseIcon data-testid="close-icon" />
        ) : (
          <HamburgerIcon data-testid="hamburger-icon" />
        )
      }
      _hover={{
        backgroundColor: "whiteAlpha.400",
      }}
      _active={{
        backgroundColor: "whiteAlpha.400",
      }}
    />
  );
};
