import { Header } from "@/widgets/header";
import { Sidebar } from "@/widgets/sidebar";
import { Container, Flex } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import { AppProvider } from "./AppProvider";
import { Modals } from "./Modals";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <AppProvider>
      <div className="wrapper">
        <Head>
          <title>Next Football</title>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <Header />
        <main className="main">
          <Container pt={4} as={Flex} gap={2} maxW="container.lg">
            <Flex flexDir="column" flex="0 0 230px" maxW={230}>
              <Sidebar />
            </Flex>
            <Flex flexDir="column" flex="1 1 auto">
              {children}
            </Flex>
          </Container>
        </main>
      </div>
      <Modals />
    </AppProvider>
  );
};
