import { SearchModal } from "@/widgets/modals/search-modal";
import { SettingsModal } from "@/widgets/modals/settings-modal";
import React from "react";

interface ModalsProps {}

export const Modals: React.FC<ModalsProps> = ({}) => {
  return (
    <>
      <SearchModal />
      <SettingsModal />
    </>
  );
};
