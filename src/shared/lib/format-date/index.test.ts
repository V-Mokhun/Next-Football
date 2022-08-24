import "@testing-library/jest-dom";
import { formatDate } from ".";

describe("Formats date", () => {
  it("Correctly convers to only hours date", () => {
    // 24.08.2022
    let date = new Date(Date.UTC(2022, 7, 24));
    expect(formatDate(date)).toEqual(`2022-08-24`);
  });

  it("Wrongly convers to only hours date", () => {
    // 01.01.2022
    let date = new Date(Date.UTC(2022, 0, 1));
    expect(formatDate(date)).not.toEqual(`01-01-2022`);
  });
});
