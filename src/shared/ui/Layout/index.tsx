import { Header } from "@/widgets/header";
import { Container } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="wrapper">
      <Head>
        <title>Football app</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Header />
      <main className="main">
        <Container maxW="container.lg">{children}</Container>
      </main>
    </div>
  );
};
