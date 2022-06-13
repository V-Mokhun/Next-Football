import { SettingsAlert, settingsModel } from "@/entities/settings";
import { ChangeTimezone } from "@/features/settings/change-timezone";
import {
  Divider,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Skeleton
} from "@chakra-ui/react";
import { useStore } from "effector-react";
import React from "react";

interface SettingsModalProps {}

export const SettingsModal: React.FC<SettingsModalProps> = ({}) => {
  const store = useStore(settingsModel.$settings);
  const isOpen = useStore(settingsModel.$modalOpen);
  const loading = useStore(settingsModel.$timezonesFetching);

  return (
    <Modal size="xl" isOpen={isOpen} onClose={settingsModel.closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading as="h2" size="lg">
            Settings
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody py={4}>
          <Heading mb={3} as="h3" size="md">
            Timezone
          </Heading>
          <Skeleton isLoaded={!loading}>
            <ChangeTimezone />
          </Skeleton>
          {store.timezoneError && <SettingsAlert error={store.timezoneError} />}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
