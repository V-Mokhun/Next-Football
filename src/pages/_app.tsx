import "@/app/index.scss";
import type { AppProps } from "next/app";
import AppProvider from "../app";
import { withHydrate } from "effector-next";
import { Layout } from "@/app/Layout";

const enhance = withHydrate();

function MainApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  );
}

export default enhance(MainApp);
