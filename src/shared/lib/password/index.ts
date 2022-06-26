import { compareSync, hashSync } from "bcryptjs";

export const hashPassword = (password: string) => {
  const hashedPassword = hashSync(password, 12);
  return hashedPassword;
};

export const comparePasswords = (hashedPassword: string, password: string) => {
  const isEqual = compareSync(password, hashedPassword);
  return isEqual;
};
