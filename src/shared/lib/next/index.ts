import { NextPage } from "next";
import { ReactElement } from "react";

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactElement;
};
