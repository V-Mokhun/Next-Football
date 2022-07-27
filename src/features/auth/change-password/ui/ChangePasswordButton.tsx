import { ArrowRightIcon, LockIcon } from "@chakra-ui/icons";
import { Button, Text } from "@chakra-ui/react";
import { useEvent } from "effector-react";
import React from "react";
import { changePasswordModel } from "..";

interface ChangePasswordButtonProps {
  onButtonClick: () => void;
}

export const ChangePasswordButton: React.FC<ChangePasswordButtonProps> = ({
  onButtonClick,
}) => {
  const buttonClicked = useEvent(changePasswordModel.buttonClicked);

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
      <LockIcon />
      <Text textAlign="left" flex="1 1 auto">
        Change password
      </Text>
      <ArrowRightIcon />
    </Button>
  );
};
