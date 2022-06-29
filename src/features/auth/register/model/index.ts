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

export const $email = restore(setEmail, "").reset(viewerModel.registerFx);
export const $password = restore(setPassword, "").reset(
  viewerModel.registerFx
);
export const $loading = viewerModel.registerFx.pending;
export const $error = createStore("").on(
  viewerModel.registerFx.failData,
  (_, { message }) => message
);

const $register = combine($email, $password, (email, password) => ({
  email,
  password,
}));

sample({
  clock: formSubmitted,
  source: $register,
  target: viewerModel.registerFx,
});

sample({
  clock: viewerModel.registerFx.doneData,
  filter: ({ success }) => success,
  fn: ({ data }) => data as IClientViewer,
  target: viewerModel.setViewer,
});

sample({
  clock: viewerModel.registerFx.doneData,
  filter: ({ success }) => success,
  target: viewerModel.closeAuthModal,
});
