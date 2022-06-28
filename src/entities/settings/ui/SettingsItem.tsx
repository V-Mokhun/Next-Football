import { ArrowRightIcon, SettingsIcon } from "@chakra-ui/icons";
import { MenuItem, Text } from "@chakra-ui/react";
import { useEvent } from "effector-react";
import React from "react";
import { settingsModel } from "..";

interface SettingsItemProps {}

export const SettingsItem: React.FC<SettingsItemProps> = ({}) => {
  const settingsButtonClicked = useEvent(settingsModel.settingsButtonClicked);

  return (
    <MenuItem
      onClick={() => settingsButtonClicked()}
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
