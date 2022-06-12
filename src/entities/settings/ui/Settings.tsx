import React, { useState } from "react";
import { SettingsItem } from "./SettingsItem";
import { SettingsModal } from "./SettingsModal";

interface SettingsProps {}

export const Settings: React.FC<SettingsProps> = ({}) => {
  const [isModalActive, setModalActive] = useState(false);

  const onClose = () => setModalActive(false);
  const onOpen = () => setModalActive(true);

  return (
    <>
      <SettingsItem onClick={onOpen} />
      <SettingsModal onClose={onClose} isOpen={isModalActive} />
    </>
  );
};
