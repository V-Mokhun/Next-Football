import { viewerModel } from "@/entities/viewer";
import { createEvent, forward, sample } from "effector-next";

export const logoutButtonClicked = createEvent();

forward({
  from: logoutButtonClicked,
  to: viewerModel.logoutViewerFx,
});

sample({
  clock: viewerModel.logoutViewerFx.doneData,
  filter: ({ success }) => success,
  target: viewerModel.logoutViewer,
});
