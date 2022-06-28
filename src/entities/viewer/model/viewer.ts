import { ChangeTimezoneResponse, IClientUser, userApi } from "@/shared/api";
import { createEffect, createEvent, forward, restore } from "effector-next";

export const setViewer = createEvent<IClientUser | null>();
export const setViewerTimezone = createEvent<string>("");

const setViewerTimezoneFx = createEffect<string, ChangeTimezoneResponse, Error>(
  async (timezone) => {
    const response = await userApi.changeTimezone(timezone);

    return response;
  }
);

export const $viewer = restore(setViewer, null).on(
  setViewerTimezoneFx.doneData,
  (state, { data, success }) =>
    state && { ...state, timezone: success ? data : "" }
);

export const $viewerTimezone = $viewer.map((state) =>
  state ? state.timezone : ""
);
export const $viewerTimezonesFetching = setViewerTimezoneFx.pending;
export const $isAuth = $viewer.map((viewer) => !!viewer);

forward({
  from: setViewerTimezone,
  to: setViewerTimezoneFx,
});
