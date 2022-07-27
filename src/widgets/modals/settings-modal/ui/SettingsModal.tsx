import { settingsModel } from "@/entities/settings";
import {
  ChangeTimezone,
  changeTimezoneModel,
} from "@/features/settings/change-timezone";
import { AlertMessage, Modal } from "@/shared/ui";
import { Heading, Skeleton } from "@chakra-ui/react";
import { useEvent, useStore } from "effector-react";
import React from "react";
import { settingsModalModel } from "..";

interface SettingsModalProps {}

export const SettingsModal: React.FC<SettingsModalProps> = ({}) => {
  const store = useStore(settingsModel.$settings);
  const changeTimezoneError = useStore(changeTimezoneModel.$timezoneError);
  const isOpen = useStore(settingsModel.$modalOpen);
  const loading = useStore(settingsModalModel.$loading);
  const closeModal = useEvent(settingsModel.closeModal);

  return (
    <Modal title="Settings" isOpen={isOpen} onClose={closeModal}>
      <Heading mb={3} as="h3" size="md">
        Timezone
      </Heading>
      <Skeleton isLoaded={!loading}>
        <ChangeTimezone />
      </Skeleton>
      {changeTimezoneError && <AlertMessage error={changeTimezoneError} />}
      {store.timezoneError && <AlertMessage error={store.timezoneError} />}
    </Modal>
  );
};
