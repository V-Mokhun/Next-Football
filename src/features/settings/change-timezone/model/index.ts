import { viewerModel } from "@/entities/viewer";
import { ChangeTimezoneResponse, userApi } from "@/shared/api";
import { createEffect, createEvent, forward, sample } from "effector-next";

export const changeTimezone = createEvent<string>();

const setViewerTimezoneFx = createEffect<string, ChangeTimezoneResponse, Error>(
  async (timezone) => {
    const response = await userApi.changeTimezone(timezone);

    return response;
  }
);

export const $viewerTimezonesFetching = setViewerTimezoneFx.pending;

forward({
  from: changeTimezone,
  to: setViewerTimezoneFx,
});

sample({
  clock: setViewerTimezoneFx.doneData,
  filter: ({ success }) => success,
  fn: ({ data }) => data,
  target: viewerModel.viewerSubmodel.setViewerTimezone,
});
