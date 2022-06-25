import {
  Avatar,
  Button,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useStore } from "effector-react";
import React from "react";
import { viewerModel } from "..";

interface ViewerButtonProps {}

export const ViewerButton: React.FC<ViewerButtonProps> = ({}) => {
  const bg = useColorModeValue("whiteAlpha.200", "whiteAlpha.200");
  const color = useColorModeValue("whiteAlpha.900", "whiteAlpha.900");
  const { onToggle } = useDisclosure();
  const isAuth = useStore(viewerModel.viewerSubmodel.$isAuth);
  const viewer = useStore(viewerModel.viewerSubmodel.$viewer);

  return (
    <Button
      display="flex"
      gap={2}
      alignItems="center"
      color={color}
      bg={bg}
      px={2}
      onClick={() =>
        isAuth
          ? onToggle()
          : viewerModel.viewerModalsSubmodel.authButtonClicked()
      }
      _hover={{
        backgroundColor: "whiteAlpha.400",
      }}
      _active={{
        backgroundColor: "whiteAlpha.400",
      }}>
      <Avatar size="xs" name={viewer?.email} />
      <Text>{isAuth ? viewer?.email : "Log in"}</Text>
    </Button>
  );
};
