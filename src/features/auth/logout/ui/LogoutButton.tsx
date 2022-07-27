import { ArrowLeftIcon } from "@chakra-ui/icons";
import { Button, Text } from "@chakra-ui/react";
import { useEvent } from "effector-react";
import React from "react";
import { logoutModel } from "..";

interface LogoutButtonProps {
  onButtonClick: () => void;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({
  onButtonClick,
}) => {
  const buttonClicked = useEvent(logoutModel.buttonClicked);

  return (
    <Button
      variant="ghost"
      w="100%"
      onClick={() => {
        buttonClicked();
        onButtonClick();
      }}
      display="flex"
      alignItems="center"
      gap={4}
    >
      <ArrowLeftIcon color="red.500" />
      <Text color="red.500" textAlign="left" flex="1 1 auto">
        Log out
      </Text>
    </Button>
  );
};
