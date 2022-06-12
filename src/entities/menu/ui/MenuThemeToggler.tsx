import { MoonIcon } from "@chakra-ui/icons";
import {
  FormLabel,
  MenuItem,
  Switch,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";

interface MenuThemeTogglerProps {}

export const MenuThemeToggler: React.FC<MenuThemeTogglerProps> = ({}) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <MenuItem display="flex" alignItems="center" gap={2}>
      <MoonIcon />
      <FormLabel flex="1 1 auto" cursor="pointer" htmlFor="color-mode" mb={0} mr={0}>
        Dark mode
      </FormLabel>
      <Switch
        id="color-mode"
        onChange={toggleColorMode}
        checked={colorMode === "dark"}
      />
    </MenuItem>
  );
};
