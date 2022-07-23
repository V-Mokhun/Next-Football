import { viewerModel } from "@/entities/viewer";
import { IClientViewer } from "@/shared/api";
import { createEvent, forward, sample } from "effector";

export const loadViewer = createEvent();

forward({
  from: loadViewer,
  to: viewerModel.loadViewerFx,
});

viewerModel.loadViewerFx.watch(state => console.log("LOAD", state))

sample({
  clock: viewerModel.loadViewerFx.doneData,
  filter: ({ success }) => success,
  fn: ({ data }) => data as IClientViewer,
  target: viewerModel.setViewer,
});
