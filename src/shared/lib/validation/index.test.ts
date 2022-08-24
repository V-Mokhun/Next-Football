import "@testing-library/jest-dom";
import { isEmail } from "./isEmail";

describe("Validates email", () => {
  test("Validates correct email", () => {
    const email = "me@me.com";
    expect(isEmail(email)).toBeTruthy();
  });

  test("Validates wrong email", () => {
    const email = "some_wrong_email@fjakf.s";
    expect(isEmail(email)).toBeFalsy();
  });
});
