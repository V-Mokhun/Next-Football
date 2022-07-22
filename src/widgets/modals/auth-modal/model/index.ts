import { createEvent, createStore, forward } from "effector";

export type AuthModalMode = "login" | "register";

const setLoginMode = createEvent();
const setRegisterMode = createEvent();
export const loginTabClicked = createEvent();
export const registerTabClicked = createEvent();

export const $authModalMode = createStore<AuthModalMode>("login")
  .on(setLoginMode, () => "login")
  .on(setRegisterMode, () => "register");

forward({
  from: loginTabClicked,
  to: setLoginMode,
});

forward({
  from: registerTabClicked,
  to: setRegisterMode,
});
