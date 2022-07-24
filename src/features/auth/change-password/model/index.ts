import { viewerModel } from "@/entities/viewer";
import { createEvent, createStore, restore, sample } from "effector";

export const buttonClicked = createEvent();
export const setOldPassword = createEvent<string>();
export const setNewPassword = createEvent<string>();
export const formSubmitted = createEvent();

export const $oldPassword = restore(setOldPassword, "")
export const $newPassword = restore(setNewPassword, "")

export const $loading = viewerModel.changePasswordFx.pending;
export const $error = createStore("");
// $error.watch((err) => console.log("STORE ERROR MESSAGE: ", err));

// $oldPassword.watch(state => console.log("OLD PASSWORD: ", state)
// )
// $newPassword.watch(state => console.log("NEW PASSWORD: ", state)
// )

sample({
  clock: formSubmitted,
  source: { oldPassword: $oldPassword, newPassword: $newPassword },
  fn: (source) => {
    // console.log("SOURCE FROM SAMPLE: ", source);
    
    return source;
  },
  target: viewerModel.changePasswordFx,
});

sample({
  clock: viewerModel.changePasswordFx.failData,
  fn: ({ message }) => message,
  target: $error,
});
