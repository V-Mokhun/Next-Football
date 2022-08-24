import "@testing-library/jest-dom";
import { createDates } from ".";

describe("Creates previous and next dates", () => {
  // 24.08.2022
  const date = new Date("2022-08-24T10:27:36.240Z");
  const prevDates = [
    "2022-08-17",
    "2022-08-18",
    "2022-08-19",
    "2022-08-20",
    "2022-08-21",
    "2022-08-22",
    "2022-08-23",
  ];
  const nextDates = [
    "2022-08-25",
    "2022-08-26",
    "2022-08-27",
    "2022-08-28",
    "2022-08-29",
    "2022-08-30",
    "2022-08-31",
  ];

  it("Correctly creates dates (prev: 17-23, next: 25-31)", () => {
    expect(createDates(date)).toEqual({
      prevSevenDates: prevDates,
      nextSevenDates: nextDates,
    });
  });
});
