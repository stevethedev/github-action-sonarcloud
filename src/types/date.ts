import { isNumber } from "./number";

export const isDate = (value: unknown): value is Date => {
  return value instanceof Date && isNumber(value.getTime());
};
