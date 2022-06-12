import { Search2Icon } from "@chakra-ui/icons";
import { IconButton, useColorModeValue } from "@chakra-ui/react";
import React from "react";

interface SearchButtonProps {
  onClick: () => void;
}

export const SearchButton: React.FC<SearchButtonProps> = ({ onClick }) => {
  const bg = useColorModeValue("whiteAlpha.200", "whiteAlpha.200");
  const color = useColorModeValue("whiteAlpha.900", "whiteAlpha.900");

  return (
    <IconButton
      color={color}
      bg={bg}
      onClick={onClick}
      aria-label="Search"
      icon={<Search2Icon />}
      _hover={{
        backgroundColor: "whiteAlpha.400",
      }}
      _active={{
        backgroundColor: "whiteAlpha.400",
      }}
    />
  );
};
