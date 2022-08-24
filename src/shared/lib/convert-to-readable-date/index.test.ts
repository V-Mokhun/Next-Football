import "@testing-library/jest-dom";
import { convertToReadableDate } from ".";

describe("Converts to readable date", () => {
  // 24.08.2022
  let date = Date.UTC(2022, 7, 24, 3, 30);
  let timezoneOffset = 3;

  it("Correctly convers to only hours date", () => {
    expect(convertToReadableDate(date, true)).toEqual(
      `0${timezoneOffset + 3}:30`
    );
  });

  it("Correctly convers to date without hours", () => {
    expect(convertToReadableDate(date, false, true, false)).toEqual(
      "24.08.2022"
    );
  });

  it("Correctly convers to date without year", () => {
    expect(convertToReadableDate(date, false)).toEqual(
      `24.08. 0${timezoneOffset + 3}:30`
    );
  });

  it("Correctly convers to full date", () => {
    expect(convertToReadableDate(date, false, true)).toEqual(
      `24.08.2022 0${timezoneOffset + 3}:30`
    );
  });

  it("Wrongly convers to full date", () => {
    expect(convertToReadableDate(date, false, true)).not.toEqual(
      `24.08.2022 03:30`
    );
  });
});
