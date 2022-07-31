import { loadViewerModel } from "@/features/auth/load";
import { COOKIE_NAME } from "@/shared/config";
import { createEvent, Event, sample } from "effector";
import { PreviewData } from "next";
import {
  isClientPageContext,
  isServerPageContext,
  PageContext,
  StaticPageContext,
} from "nextjs-effector";
import { ParsedUrlQuery } from "querystring";

export const appStarted = createEvent<PageContext>();
export const appStartedStatic = createEvent<StaticPageContext>();

export const setEntityByParamsId = (
  pageStarted: Event<StaticPageContext<ParsedUrlQuery, PreviewData>>,
  setEntity: Event<number>
) => {
  sample({
    clock: pageStarted,
    filter: ({ params }) => Boolean(params?.id),
    fn: ({ params }) => parseInt(params!.id as string, 10),
    target: setEntity,
  });
};

sample({
  source: appStarted,
  filter: isServerPageContext,
  fn: ({ req }) => req.cookies[COOKIE_NAME] || "",
  target: loadViewerModel.loadViewer,
});

sample({
  source: appStarted,
  filter: isClientPageContext,
  fn: () => "",
  target: loadViewerModel.loadViewer,
});

// sample({
//   source: appStarted,
//   target: countriesModel.fetchCountries,
// });
