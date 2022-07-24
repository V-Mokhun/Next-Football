import { loadViewerModel } from "@/features/auth/load";
import { COOKIE_NAME } from "@/shared/config";
import { createEvent, Event, sample } from "effector";
import { PageContext, ServerPageContext } from "nextjs-effector";
import { ParsedUrlQuery } from "querystring";

export const appStarted = createEvent<PageContext>();

export const loadViewerOnPageStarted = (
  pageStartedOnServer: Event<ServerPageContext<ParsedUrlQuery, ParsedUrlQuery>>
) =>
  sample({
    source: pageStartedOnServer,
    fn: ({ req }) => {
      return req.cookies[COOKIE_NAME] || "";
    },
    target: loadViewerModel.loadViewer,
  });

sample({
  clock: appStarted,
  filter: ({ env }) => env === "client",
  fn: () => "",
  target: [loadViewerModel.loadViewer],
});
