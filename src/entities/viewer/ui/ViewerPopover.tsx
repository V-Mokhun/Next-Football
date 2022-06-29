import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { ViewerButton } from "./ViewerButton";

interface ViewerPopoverProps {
  renderContent: (props: { onClose: () => void }) => React.ReactNode;
}

export const ViewerPopover: React.FC<ViewerPopoverProps> = ({
  renderContent,
}) => {
  const { onToggle, isOpen, onClose } = useDisclosure();
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <Popover returnFocusOnClose={false} isOpen={isOpen} onClose={onClose}>
      <PopoverTrigger>
        <ViewerButton ref={buttonRef} onToggle={onToggle} />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody padding={2}>
          <VStack spacing={2}>{renderContent({ onClose })}</VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
