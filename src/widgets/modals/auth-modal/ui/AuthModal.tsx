import { viewerModel } from "@/entities/viewer";
import {
  Divider,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useStore } from "effector-react";
import React, { useState } from "react";
import { authModalModel } from "..";

interface AuthModalProps {}

export const AuthModal: React.FC<AuthModalProps> = ({}) => {
  const [tabIndex, setTabIndex] = useState(0);
  const isOpen = useStore(viewerModel.viewerModalsSubmodel.$authModalOpen);

  const handleTabsChange = (index: number) => {
    setTabIndex(index)
  }

  return (
    <Modal
      size="xl"
      isOpen={isOpen}
      onClose={viewerModel.viewerModalsSubmodel.closeAuthModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading as="h2" size="lg">
            Authenticate
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody py={4}>
          <Tabs onChange={handleTabsChange}>
            <TabList justifyContent="center">
              <Tab onClick={() => authModalModel.setLoginMode()}>Log in</Tab>
              <Tab onClick={() => authModalModel.setRegisterMode()}>
                Register
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>1</TabPanel>
              <TabPanel>2</TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
