import "@/app/index.css";
import { Layout } from "@/app/Layout";
import { NextPageWithLayout } from "@/shared/lib";
import * as effectorReact from "effector-react/scope";
import type { AppProps } from "next/app";
import { withEffector } from "nextjs-effector";
import { ReactElement } from "react";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function commonLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? commonLayout;

  return getLayout(<Component {...pageProps} />);
};

export default withEffector(MyApp, { effectorReact });
