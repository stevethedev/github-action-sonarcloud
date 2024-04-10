import { assertFactory } from "@/types/assert";
import { isNumber } from "@/types/number";

export const isDate = (value: unknown): value is Date => {
  return value instanceof Date && isNumber(value.getTime());
};

export const assertIsDate = assertFactory(
  isDate,
  (value) => `Expected Date, got ${typeof value}`,
);
