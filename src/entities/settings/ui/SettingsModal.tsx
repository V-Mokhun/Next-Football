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
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
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
          <Skeleton isLoaded={!loading}>
            <Select
              icon={<TriangleDownIcon />}
              variant="outline"
              size="md"
              placeholder="Your timezone.."
              value={store.activeTimezone}
              onChange={(e) => {
                settingsModel.changeTimezone(e.target.value);
              }}>
              {store.timezones.length > 0 &&
                store.timezones.map((timezone) => (
                  <option key={timezone} value={timezone}>
                    {timezone}
                  </option>
                ))}
            </Select>
          </Skeleton>
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
