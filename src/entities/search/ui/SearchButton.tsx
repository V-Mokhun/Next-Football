import { Search2Icon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import React from "react";

interface SearchButtonProps {
  onClick: () => void;
}

export const SearchButton: React.FC<SearchButtonProps> = ({ onClick }) => {
  return (
    <IconButton onClick={onClick} aria-label="Search" icon={<Search2Icon />} />
  );
};
