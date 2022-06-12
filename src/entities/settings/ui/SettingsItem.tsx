import { ArrowRightIcon, SettingsIcon } from "@chakra-ui/icons";
import { MenuItem, Text } from "@chakra-ui/react";
import React from "react";

interface SettingsItemProps {
  onClick: () => void;
}

export const SettingsItem: React.FC<SettingsItemProps> = ({ onClick }) => {
  return (
    <MenuItem
      onClick={onClick}
      closeOnSelect
      display="flex"
      alignItems="center"
      gap={2}>
      <SettingsIcon />
      <Text flex="1 1 auto">Settings</Text>
      <ArrowRightIcon />
    </MenuItem>
  );
};
