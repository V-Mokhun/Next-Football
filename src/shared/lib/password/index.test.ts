import "@testing-library/jest-dom";
import { comparePasswords, hashPassword } from ".";

describe("Hash password", () => {
  it("Correctly hashes password", () => {
    expect(hashPassword("qwerty")).not.toEqual("qwerty");
  });
});

describe("Compare passwords", () => {
  it("Correctly compares same passwords", () => {
    const password = "qwerty";
    const hashedPassword = hashPassword(password);
    expect(comparePasswords(password, hashedPassword)).toBeTruthy();
  });

  it("Correctly compares wrong passwords", () => {
    const password = "qwerty";
    const hashedPassword = hashPassword(`${password}123`);
    expect(comparePasswords(password, hashedPassword)).toBeFalsy();
  });
});
