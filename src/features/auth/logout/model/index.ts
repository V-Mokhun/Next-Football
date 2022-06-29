import { viewerModel } from "@/entities/viewer";
import { LogoutResponse, userApi } from "@/shared/api";
import { createEffect, createEvent, forward, sample } from "effector-next";

export const logoutButtonClicked = createEvent();

const logoutUserFx = createEffect<void, LogoutResponse, Error>(async () => {
  const response = await userApi.logout();

  return response;
});

forward({
  from: logoutButtonClicked,
  to: logoutUserFx,
});

sample({
  clock: logoutUserFx.doneData,
  fn: () => null,
  target: viewerModel.viewerSubmodel.setViewer,
});
