export const getHoursFromDate = (date: string) => {
  const d = new Date(date);
  const formattedHours = `${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`;

  return formattedHours;
};
