import { viewerModel } from "@/entities/viewer";
import { ChangeTimezoneResponse, viewerApi } from "@/shared/api";
import {
  createEffect,
  createEvent,
  createStore,
  forward,
  sample,
} from "effector-next";

export const changeTimezone = createEvent<string>();

export const $timezoneError = createStore<string>("").reset(changeTimezone);
export const $viewerTimezonesFetching = viewerModel.setViewerTimezoneFx.pending;

forward({
  from: changeTimezone,
  to: viewerModel.setViewerTimezoneFx,
});

sample({
  clock: viewerModel.setViewerTimezoneFx.doneData,
  filter: ({ success }) => success,
  fn: ({ data }) => data,
  target: viewerModel.setViewerTimezone,
});

sample({
  clock: viewerModel.setViewerTimezoneFx.failData,
  fn: ({ message }) => message,
  target: $timezoneError,
});
