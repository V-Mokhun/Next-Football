import { SearchButton, SearchModal } from "@/entities/search";
import React, { useState } from "react";
import { SearchItem } from "./SearchItem";

interface SearchProps {}

export const Search: React.FC<SearchProps> = ({}) => {
  const [isModalActive, setModalActive] = useState(false);

  const onClose = () => setModalActive(false);
  const onOpen = () => setModalActive(true);

  return (
    <>
      <SearchButton onClick={onOpen} />
      <SearchModal onClose={onClose} isOpen={isModalActive}>
        <SearchItem />
      </SearchModal>
    </>
  );
};
