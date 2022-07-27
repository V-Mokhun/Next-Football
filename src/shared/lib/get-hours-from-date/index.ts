export const getHoursFromDate = (date: string) => {
  const d = new Date(date);
  const formattedHours = `${String(d.getHours()).padStart(2, "0")}:${String(
    d.getMinutes()
  ).padStart(2, "0")}`;

  return formattedHours;
};
