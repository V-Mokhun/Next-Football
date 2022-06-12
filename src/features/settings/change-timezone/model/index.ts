import { createEvent, createStore } from "effector-next";

export const changeTimezone = createEvent<string>();

export const $timezone = createStore("").on(
  changeTimezone,
  (_, activeTimezone) => activeTimezone
);
