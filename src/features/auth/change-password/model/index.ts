import { viewerModel } from "@/entities/viewer";
import { createEvent, createStore, restore, sample } from "effector";

export const buttonClicked = createEvent();
export const setOldPassword = createEvent<string>();
export const setNewPassword = createEvent<string>();
export const formSubmitted = createEvent();

export const $oldPassword = restore(setOldPassword, "").reset(
  viewerModel.changePasswordFx.doneData
);
export const $newPassword = restore(setNewPassword, "").reset(
  viewerModel.changePasswordFx.doneData
);

export const $loading = viewerModel.changePasswordFx.pending;
export const $error = createStore("").reset(viewerModel.changePasswordFx.doneData);

sample({
  clock: formSubmitted,
  source: { oldPassword: $oldPassword, newPassword: $newPassword },
  target: viewerModel.changePasswordFx,
});

sample({
  clock: viewerModel.changePasswordFx.failData,
  fn: ({ message }) => message,
  target: $error,
});
