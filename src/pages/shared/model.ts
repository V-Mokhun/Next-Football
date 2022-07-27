import { loadViewerModel } from "@/features/auth/load";
import { COOKIE_NAME } from "@/shared/config";
import { createEvent, sample } from "effector";
import {
  isClientPageContext,
  isServerPageContext,
  PageContext,
  StaticPageContext,
} from "nextjs-effector";

export const appStarted = createEvent<PageContext>();
export const appStartedStatic = createEvent<StaticPageContext>();

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
