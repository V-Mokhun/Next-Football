import { viewerModel } from "@/entities/viewer";
import {
  IClientViewer
} from "@/shared/api";
import {
  combine, createEvent,
  createStore,
  restore,
  sample
} from "effector-next";

export const setEmail = createEvent<string>();
export const setPassword = createEvent<string>();
export const formSubmitted = createEvent();

export const $email = restore(setEmail, "").reset(viewerModel.loginViewerFx);
export const $password = restore(setPassword, "").reset(
  viewerModel.loginViewerFx
);
export const $loginLoading = viewerModel.loginViewerFx.pending;
export const $loginError = createStore("").on(
  viewerModel.loginViewerFx.failData,
  (_, payload) => payload.message
);

const $login = combine($email, $password, (email, password) => ({
  email,
  password,
}));

sample({
  clock: formSubmitted,
  source: $login,
  target: viewerModel.loginViewerFx,
});

sample({
  clock: viewerModel.loginViewerFx.doneData,
  filter: ({ success }) => success,
  fn: ({ data }) => data as IClientViewer,
  target: viewerModel.setViewer,
});

sample({
  clock: viewerModel.loginViewerFx.doneData,
  filter: ({ success }) => success,
  target: viewerModel.closeAuthModal,
});
