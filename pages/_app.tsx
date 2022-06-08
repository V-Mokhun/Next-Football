import "@/app/index.scss";
import type { AppProps } from "next/app";
import AppProvider from "../app";
import { withHydrate } from "effector-next";

const enhance = withHydrate();

function MainApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <AppProvider session={session}>
      <Component {...pageProps} />
    </AppProvider>
  );
}

export default enhance(MainApp);
