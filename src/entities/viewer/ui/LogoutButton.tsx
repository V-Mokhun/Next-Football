import { ArrowLeftIcon } from "@chakra-ui/icons";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useEvent } from "effector-react";
import React from "react";
import { viewerModel } from "..";

interface LogoutButtonProps {
  onButtonClick: () => void;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({
  onButtonClick,
}) => {
  const logoutButtonClicked = useEvent(
    viewerModel.viewerSubmodel.logoutButtonClicked
  );

  return (
    <Button
      variant="ghost"
      w="100%"
      onClick={() => {
        logoutButtonClicked();
        onButtonClick();
      }}
      display="flex"
      alignItems="center"
      gap={4}>
      <ArrowLeftIcon color="red.500" />
      <Text color="red.500" textAlign="left" flex="1 1 auto">
        Log out
      </Text>
    </Button>
  );
};
