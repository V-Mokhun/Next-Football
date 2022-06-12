import { Switch, useColorMode } from "@chakra-ui/react";
import React from "react";

interface ThemeTogglerProps {}

export const ThemeToggler: React.FC<ThemeTogglerProps> = ({}) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Switch
      id="color-mode"
      colorScheme="green"
      onChange={toggleColorMode}
      isChecked={colorMode === "dark"}
    />
  );
};
