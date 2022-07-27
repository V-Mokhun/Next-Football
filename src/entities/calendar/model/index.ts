import { createDates, formatDate } from "@/shared/lib";
import { combine, createEvent, createStore, restore } from "effector";

export const dateSelected = createEvent<string>();

const todayDate = new Date();
const { nextSevenDates, prevSevenDates } = createDates(todayDate);
const formattedDate = formatDate(todayDate);

export const $selectedDate = restore<string>(dateSelected, formattedDate);
export const $allDates = createStore<string[]>([
  ...prevSevenDates,
  formattedDate,
  ...nextSevenDates,
]);
export const $calendarDisabled = createStore<boolean>(false)
export const $isFirstDate = combine($allDates, $selectedDate, (allDates, selectedDate) => allDates[0] === selectedDate)
export const $isLastDate = combine($allDates, $selectedDate, (allDates, selectedDate) => allDates[allDates.length - 1] === selectedDate)
