import { viewerModel } from "@/entities/viewer";
import { RegisterResponse, userApi, UserRequestBody } from "@/shared/api";
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

const registerUserFx = createEffect<UserRequestBody, RegisterResponse, Error>(
  async (user) => {
    const response = await userApi.register(user);
    return response;
  }
);

export const $email = restore(setEmail, "").reset(registerUserFx);
export const $password = restore(setPassword, "").reset(registerUserFx);
export const $registerLoading = registerUserFx.pending;
export const $registerError = createStore("").on(
  registerUserFx.failData,
  (_, payload) => {
    console.log(payload);

    return payload.message;
  }
);

$registerError.watch((state) => console.log(state));

const $register = combine($email, $password, (email, password) => ({
  email,
  password,
}));

sample({
  clock: formSubmitted,
  source: $register,
  target: registerUserFx,
});

sample({
  clock: registerUserFx.doneData,
  fn: (sourceData) =>
    typeof sourceData.data === "string" ? null : sourceData.data,
  target: viewerModel.viewerSubmodel.setViewer,
});

sample({
  clock: registerUserFx.doneData,
  filter: (sourceData) => sourceData.success,
  target: viewerModel.viewerModalsSubmodel.closeAuthModal,
});
