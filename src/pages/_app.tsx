import "@/app/index.css";
import { AppProvider } from "@/app/AppProvider";
import { Layout } from "@/app/Layout";
import { withHydrate } from "effector-next";
import type { AppProps } from "next/app";

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
