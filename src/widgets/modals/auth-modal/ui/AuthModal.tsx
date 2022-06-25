import { viewerModel } from "@/entities/viewer";
import { LoginForm } from "@/features/auth/login";
import { RegisterForm } from "@/features/auth/register";
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
    setTabIndex(index);
  };

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
          <Tabs index={tabIndex} onChange={handleTabsChange}>
            <TabList justifyContent="center">
              <Tab onClick={() => authModalModel.loginTabClicked()}>Log in</Tab>
              <Tab onClick={() => authModalModel.registerTabClicked()}>
                Register
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <LoginForm
                  changeAuthMode={() => {
                    authModalModel.registerTabClicked();
                    setTabIndex(1);
                  }}
                />
              </TabPanel>
              <TabPanel>
                <RegisterForm
                  changeAuthMode={() => {
                    authModalModel.loginTabClicked();
                    setTabIndex(0);
                  }}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
