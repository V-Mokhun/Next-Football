import "@/app/index.css";
import { Layout } from "@/app/Layout";
import * as effectorReact from "effector-react/scope";
import type { AppProps } from "next/app";
import { withEffector } from "nextjs-effector";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default withEffector(MyApp, { effectorReact });
