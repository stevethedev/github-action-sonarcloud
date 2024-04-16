import { getAssertType } from "@std-types/assert-type";
import isNumber from "@std-types/is-number";
import isInstanceOf from "@std-types/is-instance-of";

export const isDate = (value: unknown): value is Date => {
  return isInstanceOf(value, Date) && isNumber(value.getTime());
};

export const assertIsDate = getAssertType(
  isDate,
  (value) => `Expected Date, got ${typeof value}`,
);
