import { viewerModel } from "@/entities/viewer";
import { createEvent, sample } from "effector";

export const changeTimezone = createEvent<string>();

export const $viewerTimezonesFetching = viewerModel.changeTimezoneFx.pending;

sample({
  clock: changeTimezone,
  target: viewerModel.changeTimezoneFx,
});

sample({
  clock: viewerModel.changeTimezoneFx.doneData,
  filter: ({ success }) => success,
  fn: ({ data }) => data,
  target: viewerModel.changeViewerTimezone,
});
