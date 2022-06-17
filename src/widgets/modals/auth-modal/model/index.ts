import { createEvent, createStore } from "effector-next";

export type AuthModalMode = "login" | "register";

export const setLoginMode = createEvent();
export const setRegisterMode = createEvent();

export const $authModalMode = createStore<AuthModalMode>("login")
  .on(setLoginMode, () => "login")
  .on(setRegisterMode, () => "register");
