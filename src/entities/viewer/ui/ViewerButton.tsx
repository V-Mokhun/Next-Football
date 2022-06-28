import {
  Avatar,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useEvent, useStore } from "effector-react";
import React from "react";
import { viewerModel } from "..";
import { ChangePasswordButton } from "./ChangePasswordButton";
import { LogoutButton } from "./LogoutButton";

interface ViewerButtonProps {}

export const ViewerButton: React.FC<ViewerButtonProps> = ({}) => {
  const bg = useColorModeValue("whiteAlpha.200", "whiteAlpha.200");
  const color = useColorModeValue("whiteAlpha.900", "whiteAlpha.900");
  const { onToggle, isOpen, onClose } = useDisclosure();
  const isAuth = useStore(viewerModel.viewerSubmodel.$isAuth);
  const viewer = useStore(viewerModel.viewerSubmodel.$viewer);
  const authButtonClicked = useEvent(
    viewerModel.viewerModalsSubmodel.authButtonClicked
  );

  return (
    <Popover returnFocusOnClose={false} isOpen={isOpen} onClose={onClose}>
      <PopoverTrigger>
        <Button
          display="flex"
          gap={2}
          alignItems="center"
          color={color}
          bg={bg}
          px={2}
          onClick={() => (isAuth ? onToggle() : authButtonClicked())}
          _hover={{
            backgroundColor: "whiteAlpha.400",
          }}
          _active={{
            backgroundColor: "whiteAlpha.400",
          }}>
          <Avatar size="xs" name={viewer?.email} />
          <Text>{isAuth ? viewer?.email : "Log in"}</Text>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody padding={2}>
          <VStack spacing={2}>
            <ChangePasswordButton onButtonClick={onClose} />
            <LogoutButton onButtonClick={onClose} />
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
