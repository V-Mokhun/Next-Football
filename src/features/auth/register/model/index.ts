import { viewerModel } from "@/entities/viewer";
import { IClientViewer } from "@/shared/api";
import {
  combine,
  createEvent,
  createStore,
  restore,
  sample,
} from "effector-next";

export const setEmail = createEvent<string>();
export const setPassword = createEvent<string>();
export const formSubmitted = createEvent();

export const $email = restore(setEmail, "").reset(viewerModel.registerViewerFx);
export const $password = restore(setPassword, "").reset(
  viewerModel.registerViewerFx
);
export const $registerLoading = viewerModel.registerViewerFx.pending;
export const $registerError = createStore("").on(
  viewerModel.registerViewerFx.failData,
  (_, { message }) => message
);

const $register = combine($email, $password, (email, password) => ({
  email,
  password,
}));

sample({
  clock: formSubmitted,
  source: $register,
  target: viewerModel.registerViewerFx,
});

sample({
  clock: viewerModel.registerViewerFx.doneData,
  filter: ({ success }) => success,
  fn: ({ data }) => data as IClientViewer,
  target: viewerModel.setViewer,
});

sample({
  clock: viewerModel.registerViewerFx.doneData,
  filter: ({ success }) => success,
  target: viewerModel.closeAuthModal,
});
