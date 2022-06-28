import { viewerModel } from "@/entities/viewer";
import { ChangeTimezoneResponse, userApi } from "@/shared/api";
import { createEffect, createEvent, forward } from "effector-next";

export const changeTimezone = createEvent<string>();
const setViewerTimezoneFx = createEffect<string, ChangeTimezoneResponse, Error>(
  async (timezone) => {
    const response = await userApi.changeTimezone(timezone);

    return response;
  }
);

export const $timezone = viewerModel.viewerSubmodel.$viewerTimezone;
export const $viewerTimezonesFetching = setViewerTimezoneFx.pending;

viewerModel.viewerSubmodel.$viewer.on(
  setViewerTimezoneFx.doneData,
  (state, { data, success }) =>
    state && { ...state, timezone: success ? data : "" }
);

forward({
  from: changeTimezone,
  to: setViewerTimezoneFx,
});
