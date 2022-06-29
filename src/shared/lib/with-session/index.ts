import { IClientViewer } from "@/shared/api";
import { IRON_SESSION_PASS } from "@/shared/config";
import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler
} from "next";

export const sessionOptions = {
  password: IRON_SESSION_PASS,
  cookieName: "next-football",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}

export function withSessionSsr<
  P extends { [key: string]: unknown } = { [key: string]: unknown }
>(
  handler: (
    context: GetServerSidePropsContext
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
  return withIronSessionSsr(handler, sessionOptions);
}

declare module 'iron-session' {
  interface IronSessionData {
    viewer?: IClientViewer
  }
}
