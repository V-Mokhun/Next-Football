import { viewerModel } from "@/entities/viewer";
import {
    combine,
    createEvent,
    createStore, restore,
    sample
} from "effector";

export const buttonClicked = createEvent();
export const setOldPassword = createEvent<string>();
export const setNewPassword = createEvent<string>();
export const formSubmitted = createEvent();

export const $oldPassword = restore(setOldPassword, "").reset(viewerModel.changePasswordFx);
export const $newPassword = restore(setNewPassword, "").reset(viewerModel.changePasswordFx);

export const $loading = viewerModel.changePasswordFx.pending;
export const $error = createStore("").on(
  viewerModel.changePasswordFx.failData,
  (_, { message }) => message
);

const $state = combine(
  $oldPassword,
  $newPassword,
  (oldPassword, newPassword) => ({
    oldPassword,
    newPassword,
  })
);

sample({
  clock: formSubmitted,
  source: $state,
  target: viewerModel.changePasswordFx,
});
