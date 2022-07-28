const MS_PER_DAY = 1000 * 60 * 60 * 24;

export const convertToReadableDate = (date: string, onlyHours = false) => {
  const today = new Date();
  const givenDate = new Date(date);

  let readableDate = "";
  const hoursAndMinutes = `${String(givenDate.getHours()).padStart(
    2,
    "0"
  )}:${String(givenDate.getMinutes()).padStart(2, "0")}`;

  if (onlyHours) {
    readableDate = hoursAndMinutes;
  } else {
    const month = String(givenDate.getMonth() + 1).padStart(2, "0");
    const day = String(givenDate.getDate()).padStart(2, "0");
    readableDate = `${day}.${month}. ${hoursAndMinutes}`;
  }

  return readableDate;
};
