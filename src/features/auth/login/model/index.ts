import { viewerModel } from "@/entities/viewer";
import { IClientViewer } from "@/shared/api";
import { combine, createEvent, createStore, restore, sample } from "effector";

export const setEmail = createEvent<string>();
export const setPassword = createEvent<string>();
export const formSubmitted = createEvent();

export const $email = restore(setEmail, "").reset(viewerModel.loginFx);
export const $password = restore(setPassword, "").reset(viewerModel.loginFx);
export const $loading = viewerModel.loginFx.pending;
export const $error = createStore("").on(
  viewerModel.loginFx.failData,
  (_, payload) => payload.message
);

const $login = combine($email, $password, (email, password) => ({
  email,
  password,
}));

sample({
  clock: formSubmitted,
  source: $login,
  target: viewerModel.loginFx,
});

sample({
  clock: viewerModel.loginFx.doneData,
  filter: ({ success }) => success,
  fn: ({ data }) => data as IClientViewer,
  target: viewerModel.setViewer,
});

sample({
  clock: viewerModel.loginFx.doneData,
  filter: ({ success }) => success,
  target: viewerModel.closeAuthModal,
});
