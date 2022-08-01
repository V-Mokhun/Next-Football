import { createEvent, createStore, sample } from "effector";

export type AuthModalMode = "login" | "register";

const setLoginMode = createEvent();
const setRegisterMode = createEvent();
export const loginTabClicked = createEvent();
export const registerTabClicked = createEvent();

export const $authModalMode = createStore<AuthModalMode>("login")
  .on(setLoginMode, () => "login")
  .on(setRegisterMode, () => "register");

sample({
  clock: loginTabClicked,
  target: setLoginMode,
});

sample({
  clock: registerTabClicked,
  target: setRegisterMode,
});
