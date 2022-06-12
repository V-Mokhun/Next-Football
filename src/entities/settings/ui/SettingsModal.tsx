import { TriangleDownIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Divider,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Skeleton,
} from "@chakra-ui/react";
import { useStore } from "effector-react";
import React from "react";
import { settingsModel } from "..";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectTimezones: React.ReactNode;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  selectTimezones,
}) => {
  const store = useStore(settingsModel.$settings);
  const loading = useStore(settingsModel.$timezonesFetching);

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
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
          <Skeleton isLoaded={!loading}>{selectTimezones}</Skeleton>
          {store.timezoneError && (
            <Alert mt={2} status="error">
              <AlertIcon />
              <AlertTitle>Error!</AlertTitle>
              <AlertDescription>{store.timezoneError}</AlertDescription>
            </Alert>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
