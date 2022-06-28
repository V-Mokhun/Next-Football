import { IClientUser } from "@/shared/api";
import { createEvent, restore } from "effector-next";

export const setViewer = createEvent<IClientUser | null>();
export const changePasswordButtonClicked = createEvent();
export const logoutButtonClicked = createEvent();

export const $viewer = restore(setViewer, null)

export const $viewerTimezone = $viewer.map((state) =>
  state ? state.timezone : ""
);
export const $isAuth = $viewer.map((viewer) => !!viewer);
