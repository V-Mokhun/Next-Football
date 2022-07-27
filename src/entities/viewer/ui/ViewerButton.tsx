import { Avatar, Button, Text, useColorModeValue } from "@chakra-ui/react";
import { useEvent, useStore } from "effector-react";
import React, { Ref } from "react";
import { viewerModel } from "..";

interface ViewerButtonProps {
  onToggle: () => void;
  ref: Ref<HTMLButtonElement> | undefined;
}
export const ViewerButton: React.FC<ViewerButtonProps> = React.forwardRef(
  ({ onToggle }, ref) => {
    const bg = useColorModeValue("whiteAlpha.200", "whiteAlpha.200");
    const color = useColorModeValue("whiteAlpha.900", "whiteAlpha.900");
    const isAuthenticated = useStore(viewerModel.$isAuthenticated);
    const viewer = useStore(viewerModel.$viewer);
    const buttonClicked = useEvent(viewerModel.buttonClicked);

    return (
      <Button
        display="flex"
        gap={2}
        alignItems="center"
        color={color}
        bg={bg}
        px={2}
        ref={ref}
        onClick={() => (isAuthenticated ? onToggle() : buttonClicked())}
        _hover={{
          backgroundColor: "whiteAlpha.400",
        }}
        _active={{
          backgroundColor: "whiteAlpha.400",
        }}
      >
        <Avatar size="xs" name={viewer?.email} />
        <Text>{isAuthenticated ? viewer?.email : "Log in"}</Text>
      </Button>
    );
  }
);
