import React, { useState } from "react";
import { SearchButton } from "./SearchButton";
import { SearchModal } from "./SearchModal";

interface SearchProps {}

export const Search: React.FC<SearchProps> = ({}) => {
  const [isModalActive, setModalActive] = useState(false);

  const onClose = () => setModalActive(false);
  const onOpen = () => setModalActive(true);

  return (
    <>
      <SearchButton onClick={onOpen} />
      <SearchModal onClose={onClose} isOpen={isModalActive} />
    </>
  );
};
