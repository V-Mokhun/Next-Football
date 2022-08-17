export const convertToReadableDate = (
  date: string,
  onlyHours = false,
  showYear = false,
  showHours = true
) => {
  const givenDate = new Date(date);

  let readableDate = "";
  const hoursAndMinutes = `${String(givenDate.getHours()).padStart(
    2,
    "0"
  )}:${String(givenDate.getMinutes()).padStart(2, "0")}`;

  if (onlyHours) {
    readableDate = hoursAndMinutes;
  } else {
    const year = String(givenDate.getFullYear());
    const month = String(givenDate.getMonth() + 1).padStart(2, "0");
    const day = String(givenDate.getDate()).padStart(2, "0");
    readableDate = `${day}.${month}.${showYear ? year : ""} ${
      showHours ? hoursAndMinutes : ""
    }`;
  }

  return readableDate;
};
