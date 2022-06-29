import { ChangeTimezoneResponse, IClientUser, userApi } from "@/shared/api";
import { createEffect, createEvent, restore } from "effector-next";

export const setViewer = createEvent<IClientUser | null>();
export const setViewerTimezone = createEvent<string>();

export const $viewer = restore(setViewer, null).on(
  setViewerTimezone,
  (state, timezone) => state && { ...state, timezone }
);

export const $viewerTimezone = $viewer.map((state) =>
  state ? state.timezone : ""
);
export const $isAuth = $viewer.map((viewer) => !!viewer);
