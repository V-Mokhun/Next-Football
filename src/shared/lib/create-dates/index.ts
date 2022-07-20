import { formatDate } from "../format-date";

export const createDates = (todayDate: Date) => {
  const prevSevenDates: string[] = [];
  const nextSevenDates: string[] = [];
  for (let i = 1; i <= 7; i++) {
    const prevDate = new Date().setDate(todayDate.getDate() - i);
    const nextDate = new Date().setDate(todayDate.getDate() + i);

    const formattedPrevDate = formatDate(new Date(prevDate));
    const formattedNextDate = formatDate(new Date(nextDate));

    prevSevenDates.unshift(formattedPrevDate);
    nextSevenDates.push(formattedNextDate);
  }

  return { prevSevenDates, nextSevenDates };
};
