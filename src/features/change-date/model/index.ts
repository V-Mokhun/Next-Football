import { calendarModel } from "@/entities/calendar";
import { createEvent, sample } from "effector";

export const nextDayButtonClicked = createEvent();
export const prevDayButtonClicked = createEvent();

sample({
  clock: calendarModel.dateSelected,
  target: calendarModel.$selectedDate,
});

sample({
  clock: prevDayButtonClicked,
  source: {
    selectedDate: calendarModel.$selectedDate,
    allDates: calendarModel.$allDates,
  },
  filter: calendarModel.$isFirstDate.map((isFirst) => !isFirst),
  fn: ({ selectedDate, allDates }) => {
    const selectedDateIdx = allDates.findIndex((date) => date === selectedDate);

    return allDates[selectedDateIdx - 1];
  },
  target: calendarModel.$selectedDate,
});

sample({
  clock: nextDayButtonClicked,
  source: {
    selectedDate: calendarModel.$selectedDate,
    allDates: calendarModel.$allDates,
  },
  filter: calendarModel.$isLastDate.map((isLast) => !isLast),
  fn: ({ selectedDate, allDates }) => {
    const selectedDateIdx = allDates.findIndex((date) => date === selectedDate);

    return allDates[selectedDateIdx + 1];
  },
  target: calendarModel.$selectedDate,
});
