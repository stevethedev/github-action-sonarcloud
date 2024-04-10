import { assertFactory } from "@/types/assert";

export const isString = (value: unknown): value is string =>
  typeof value === "string";

export const assertIsString = assertFactory(
  isString,
  (value) => `Expected string, got ${typeof value}`,
);
