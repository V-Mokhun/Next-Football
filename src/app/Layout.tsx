import { Header } from "@/widgets/header";
import { Sidebar } from "@/widgets/sidebar";
import {
  Container,
  ContainerProps,
  Flex,
  Hide,
  useColorMode,
} from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import { Modals } from "./Modals";

interface LayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  containerProps?: ContainerProps;
  isWhiteContainer?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  showSidebar = true,
  containerProps,
  isWhiteContainer = false,
}) => {
  const { colorMode } = useColorMode();

  let bgColor = "initial";

  if (isWhiteContainer) {
    bgColor = colorMode === "dark" ? "#010a0f" : "#fff";
  }

  return (
    <>
      <div className="wrapper">
        <Head>
          <title>Next Football</title>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <Header mobileMenu={<Sidebar isMobile={true} />} />
        <main className="main">
          <Container
            pt={4}
            as={Flex}
            gap={2}
            maxW="container.lg"
            backgroundColor={bgColor}
            {...containerProps}
          >
            {showSidebar && (
              <Hide below="md">
                <Flex flexDir="column" flex="0 0 230px" maxW={230}>
                  <Sidebar />
                </Flex>
              </Hide>
            )}
            <Flex flexDir="column" flex="1 1 auto">
              {children}
            </Flex>
          </Container>
        </main>
      </div>
      <Modals />
    </>
  );
};
