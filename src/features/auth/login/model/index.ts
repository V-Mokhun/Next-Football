import { viewerModel } from "@/entities/viewer";
import { LoginResponse, userApi, UserRequestBody } from "@/shared/api";
import {
  combine,
  createEffect,
  createEvent,
  createStore,
  restore,
  sample,
} from "effector-next";

export const setEmail = createEvent<string>();
export const setPassword = createEvent<string>();
export const formSubmitted = createEvent();

const loginUserFx = createEffect<UserRequestBody, LoginResponse, Error>(
  async (user) => {
    const response = await userApi.login(user);
    return response;
  }
);

export const $email = restore(setEmail, "").reset(loginUserFx);
export const $password = restore(setPassword, "").reset(loginUserFx);
export const $loginLoading = loginUserFx.pending;
export const $loginError = createStore("").on(
  loginUserFx.failData,
  (_, payload) => payload.message
);

const $login = combine($email, $password, (email, password) => ({
  email,
  password,
}));

sample({
  clock: formSubmitted,
  source: $login,
  target: loginUserFx,
});

sample({
  clock: loginUserFx.doneData,
  fn: (sourceData) =>
    typeof sourceData.data === "string" ? null : sourceData.data,
  target: viewerModel.viewerSubmodel.setViewer,
});

sample({
  clock: loginUserFx.doneData,
  filter: (sourceData) => sourceData.success,
  target: viewerModel.viewerModalsSubmodel.closeAuthModal,
});
