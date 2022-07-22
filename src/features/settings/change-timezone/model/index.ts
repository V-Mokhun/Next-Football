import { viewerModel } from "@/entities/viewer";
import {
    createEvent,
    createStore,
    forward,
    sample
} from "effector";

export const changeTimezone = createEvent<string>();

export const $timezoneError = createStore<string>("").reset(changeTimezone);
export const $viewerTimezonesFetching = viewerModel.changeTimezoneFx.pending;

forward({
  from: changeTimezone,
  to: viewerModel.changeTimezoneFx,
});

sample({
  clock: viewerModel.changeTimezoneFx.doneData,
  filter: ({ success }) => success,
  fn: ({ data }) => data,
  target: viewerModel.changeViewerTimezone,
});

sample({
  clock: viewerModel.changeTimezoneFx.failData,
  fn: ({ message }) => message,
  target: $timezoneError,
});
