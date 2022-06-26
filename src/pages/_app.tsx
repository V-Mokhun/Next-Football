import "@/app/index.scss";
import { Layout } from "@/app/Layout";
import { withHydrate } from "effector-next";
import type { AppProps } from "next/app";
import AppProvider from "../app";

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
