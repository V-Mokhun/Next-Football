import { viewerModel } from "@/entities/viewer";
import { IClientViewer } from "@/shared/api";
import { createEvent, sample } from "effector";

export const loadViewer = createEvent<string | void>();

sample({
  clock: loadViewer,
  target: viewerModel.loadViewerFx,
});

sample({
  clock: viewerModel.loadViewerFx.doneData,
  filter: ({ success }) => success,
  fn: ({ data }) => data as IClientViewer,
  target: viewerModel.setViewer,
});
