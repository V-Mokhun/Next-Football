import { createEvent, restore } from "effector-next";

export const changeTimezone = createEvent<string>();

export const $timezone = restore(changeTimezone, "");
