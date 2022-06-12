import React, { useRef, useState } from "react";
import { settingsModel } from "..";
import { SettingsItem } from "./SettingsItem";
import { SettingsModal } from "./SettingsModal";

interface SettingsProps {}

export const Settings: React.FC<SettingsProps> = ({}) => {
  const [isModalActive, setModalActive] = useState(false);
  const isOpenedFirstTime = useRef(true);

  const onClose = () => setModalActive(false);
  const onOpen = () => {
    if (isOpenedFirstTime) {
      settingsModel.fetchTimezonesFx();
    }
    setModalActive(true);
    isOpenedFirstTime.current = false;
  };

  return (
    <>
      <SettingsItem onClick={onOpen} />
      <SettingsModal onClose={onClose} isOpen={isModalActive} />
    </>
  );
};
